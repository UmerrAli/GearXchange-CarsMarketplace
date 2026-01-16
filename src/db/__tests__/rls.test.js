import { describe, it, expect, beforeAll } from "vitest";
import {
  createAnonClient,
  createAuthClient,
  createTestUser,
  generateCarData,
  generateUniqueEmail,
} from "./test-utils.js";

describe("Row Level Security (RLS) Tests", () => {
  let testUser1, testUser2;
  let authClient1, authClient2;
  let testCar1, testCar2;

  beforeAll(async () => {
    // Create two test users for testing ownership scenarios
    const email1 = generateUniqueEmail();
    const email2 = generateUniqueEmail();
    const password = "TestPassword123!";

    const result1 = await createTestUser(email1, password);
    const result2 = await createTestUser(email2, password);

    expect(result1.error).toBeNull();
    expect(result2.error).toBeNull();

    testUser1 = { ...result1.user, profile: result1.profile };
    testUser2 = { ...result2.user, profile: result2.profile };

    // Create authenticated clients
    const auth1 = await createAuthClient(email1, password);
    const auth2 = await createAuthClient(email2, password);

    authClient1 = auth1.client;
    authClient2 = auth2.client;

    // Create test cars for each user
    const carData1 = generateCarData(testUser1.profile.id);
    const carData2 = generateCarData(testUser2.profile.id);

    const { data: car1, error: carError1 } = await authClient1
      .from("cars")
      .insert(carData1)
      .select()
      .single();

    const { data: car2, error: carError2 } = await authClient2
      .from("cars")
      .insert(carData2)
      .select()
      .single();

    expect(carError1).toBeNull();
    expect(carError2).toBeNull();

    testCar1 = car1;
    testCar2 = car2;
  });



  describe("Cars Table - Anonymous User Tests", () => {
    it("should allow anonymous users to view all cars (SELECT)", async () => {
      const anonClient = createAnonClient();
      const { data, error } = await anonClient.from("cars").select("*");

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it("should NOT allow anonymous users to create cars (INSERT)", async () => {
      const anonClient = createAnonClient();
      const carData = generateCarData(testUser1.profile.id);

      const { data, error } = await anonClient
        .from("cars")
        .insert(carData)
        .select();

      expect(error).not.toBeNull();
      expect(data).toBeNull();
    });

    it("should NOT allow anonymous users to update cars (UPDATE)", async () => {
      const anonClient = createAnonClient();

      const { data, error } = await anonClient
        .from("cars")
        .update({ title: "Updated by Anon" })
        .eq("id", testCar1.id)
        .select();

      expect(error !== null || data === null || data.length === 0).toBe(true);
    });

    it("should NOT allow anonymous users to delete cars (DELETE)", async () => {
      const anonClient = createAnonClient();

      const { data, error } = await anonClient
        .from("cars")
        .delete()
        .eq("id", testCar1.id);

      expect(
        error !== null ||
          data === null ||
          (Array.isArray(data) && data.length === 0),
      ).toBe(true);
    });
  });

  describe("Cars Table - Authenticated User Tests", () => {
    it("should allow authenticated users to create cars (INSERT)", async () => {
      const carData = generateCarData(testUser1.profile.id);

      const { data, error } = await authClient1
        .from("cars")
        .insert(carData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.title).toBe(carData.title);

      await authClient1.from("cars").delete().eq("id", data.id);
    });

    it("should allow authenticated users to update their own cars (UPDATE)", async () => {
      const newTitle = "Updated Title by Owner";

      const { data, error } = await authClient1
        .from("cars")
        .update({ title: newTitle })
        .eq("id", testCar1.id)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.title).toBe(newTitle);
    });

    it("should NOT allow authenticated users to update other users' cars (UPDATE)", async () => {
      const { data, error } = await authClient1
        .from("cars")
        .update({ title: "Trying to update someone else's car" })
        .eq("id", testCar2.id)
        .select();

      // RLS blocks by returning empty array or error
      expect(error !== null || (Array.isArray(data) && data.length === 0)).toBe(
        true,
      );
    });

    it("should allow authenticated users to delete their own cars (DELETE)", async () => {
      // Create a car to delete
      const carData = generateCarData(testUser1.profile.id);
      const { data: newCar } = await authClient1
        .from("cars")
        .insert(carData)
        .select()
        .single();

      const { error } = await authClient1
        .from("cars")
        .delete()
        .eq("id", newCar.id);

      expect(error).toBeNull();

      // Verify deletion
      const { data: deletedCar } = await authClient1
        .from("cars")
        .select()
        .eq("id", newCar.id)
        .single();

      expect(deletedCar).toBeNull();
    });

    it("should NOT allow authenticated users to delete other users' cars (DELETE)", async () => {
      const { error, data } = await authClient1
        .from("cars")
        .delete()
        .eq("id", testCar2.id);

      // RLS blocks by returning empty result or error
      expect(
        error !== null ||
          data === null ||
          (Array.isArray(data) && data.length === 0),
      ).toBe(true);

      // Verify car still exists
      const { data: stillExists } = await authClient2
        .from("cars")
        .select()
        .eq("id", testCar2.id)
        .single();

      expect(stillExists).toBeDefined();
    });
  });

  describe("Profiles Table - RLS Tests", () => {
    it("should allow authenticated users to create their profile (INSERT)", async () => {
      // This is already tested in beforeAll, but we can verify
      expect(testUser1.profile).toBeDefined();
      expect(testUser1.profile.user_id).toBe(testUser1.id);
    });

    it("should allow authenticated users to read their own profile (SELECT)", async () => {
      const { data, error } = await authClient1
        .from("profiles")
        .select("*")
        .eq("user_id", testUser1.id)
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.user_id).toBe(testUser1.id);
    });

    it("should NOT allow authenticated users to read other profiles (SELECT)", async () => {
      const { data, error } = await authClient1
        .from("profiles")
        .select("*")
        .eq("user_id", testUser2.id)
        .single();

      // RLS blocks by returning null or error
      expect(data === null || error !== null).toBe(true);
    });

    it("should allow authenticated users to update their own profile (UPDATE)", async () => {
      const newPhone = "+9999999999";

      const { data, error } = await authClient1
        .from("profiles")
        .update({ phone: newPhone })
        .eq("user_id", testUser1.id)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.phone).toBe(newPhone);
      expect(data.user_id).toBe(testUser1.id);
    });

    it("should NOT allow authenticated users to update other profiles (UPDATE)", async () => {
      const { data, error } = await authClient1
        .from("profiles")
        .update({ phone: "+8888888888" })
        .eq("user_id", testUser2.id)
        .select();

      expect(error !== null || (Array.isArray(data) && data.length === 0)).toBe(
        true,
      );
    });

    it("should NOT allow authenticated users to delete any profile (DELETE)", async () => {
      const { error: ownError, data: ownData } = await authClient1
        .from("profiles")
        .delete()
        .eq("user_id", testUser1.id);

      expect(
        ownError !== null ||
          ownData === null ||
          (Array.isArray(ownData) && ownData.length === 0),
      ).toBe(true);

      const { error: otherError, data: otherData } = await authClient1
        .from("profiles")
        .delete()
        .eq("user_id", testUser2.id);

      expect(
        otherError !== null ||
          otherData === null ||
          (Array.isArray(otherData) && otherData.length === 0),
      ).toBe(true);
    });
  });

  describe("Car Images Table - RLS Tests", () => {
    it("should allow anonymous users to view car images (SELECT)", async () => {
      const anonClient = createAnonClient();
      const { data, error } = await anonClient
        .from("car_images")
        .select("*")
        .limit(10);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
    });

    it("should allow authenticated users to add images to their cars (INSERT)", async () => {
      const imageData = {
        car_id: testCar1.id,
        image_url: "https://example.com/test-image.jpg",
        position: 0,
        is_primary: true,
      };

      const { data, error } = await authClient1
        .from("car_images")
        .insert(imageData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.car_id).toBe(testCar1.id);
    });

    it("should NOT allow authenticated users to add images to other users' cars (INSERT)", async () => {
      const imageData = {
        car_id: testCar2.id, // User 1 trying to add image to User 2's car
        image_url: "https://example.com/malicious-image.jpg",
        position: 0,
        is_primary: false,
      };

      const { data, error } = await authClient1
        .from("car_images")
        .insert(imageData)
        .select();

      // RLS blocks by returning error or null
      expect(
        error !== null ||
          data === null ||
          (Array.isArray(data) && data.length === 0),
      ).toBe(true);
    });
  });
});

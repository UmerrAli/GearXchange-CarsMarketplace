import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;

export function createAnonClient() {
  return createClient(SUPABASE_URL, VITE_SUPABASE_KEY);
}

/**
 * Creates an authenticated Supabase client
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{client: object, user: object, error: object}>}
 */
export async function createAuthClient(email, password) {
  const client = createClient(SUPABASE_URL, VITE_SUPABASE_KEY);

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { client: null, user: null, error };
  }

  return { client, user: data.user, error: null };
}

/**
 * Creates a test user and their profile
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{user: object, profile: object, error: object}>}
 */
export async function createTestUser(email, password) {
  const client = createAnonClient();

  // Sign up the user
  const { data: authData, error: authError } = await client.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { user: null, profile: null, error: authError };
  }

  // Create profile for the user
  const { data: profileData, error: profileError } = await client
    .from("profiles")
    .insert({
      user_id: authData.user.id,
      email: email,
      phone: "+1234567890",
    })
    .select()
    .single();

  if (profileError) {
    return { user: authData.user, profile: null, error: profileError };
  }

  return { user: authData.user, profile: profileData, error: null };
}

/**
 * Generates test car data
 * @param {number} profileId - Profile ID
 * @returns {object} Car data object
 */
export function generateCarData(profileId) {
  return {
    title: "Test Car",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    city: "Test City",
    price: 25000,
    features: JSON.stringify({
      ac: true,
      alloy: true,
      abs: true,
      power_steering: true,
      power_windows: true,
      immobilizer: false,
      sun_roof: false,
    }),
    description: "Test car description",
    color: "Blue",
    mileage: 50000,
    created_at: new Date().toISOString(),
    profile_id: profileId,
    phone: "+1234567890",
  };
}

/**
 * Generates a unique email for testing
 * @returns {string} Unique email address
 */
export function generateUniqueEmail() {
  return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
}

import { supabase } from "../../configs/supabase-config";

export const deleteImages = async (id, profile) => {
  // 1. Verify ownership
  const { data: car, error: ownerError } = await supabase
    .from("cars")
    .select("id")
    .eq("id", id)
    .eq("profile_id", profile.id)
    .single();

  if (ownerError || !car) {
    console.error("Error verifying deletion ownership:", ownerError);
    return { error: "Unauthorized or Ad not found" };
  }

  // 2. Fetch associated images to get their URLs
  const { data: images, error: fetchError } = await supabase
    .from("car_images")
    .select("image_url")
    .eq("car_id", id);

  if (fetchError) {
    console.error("Error fetching associated images:", fetchError);
  }

  // 3. Delete from actual Bucket
  if (images && images.length > 0) {
    const fileNames = images
      .map((img) => {
        const url = img.image_url;
        const parts = url.split("/carImages/");
        return parts.length > 1 ? parts[1] : null;
      })
      .filter((name) => name !== null);

    if (fileNames.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("carImages")
        .remove(fileNames);

      if (storageError) {
        console.error("Error deleting files from bucket:", storageError);
      }
    }
  }

  // 4. Delete associated images rows
  const { error: imagesError } = await supabase
    .from("car_images")
    .delete()
    .eq("car_id", id);

  if (imagesError) {
    console.error("Error deleting associated images rows:", imagesError);
    return { data: null, error: imagesError };
  }
};

export const deleteAd = async (id, profile) => {
  await deleteImages(id, profile);
  // 5. Delete the car
  const { data, error } = await supabase
    .from("cars")
    .delete()
    .eq("id", id)
    .eq("profile_id", profile.id);

  return { data, error };
};

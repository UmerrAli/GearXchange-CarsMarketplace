import { supabase } from "../../configs/supabase-config";

export const updateAd = async (id, data, imagesUrl) => {
  const features = JSON.stringify({
    ac: data.ac ? true : false,
    alloy: data.alloy ? true : false,
    abs: data.abs ? true : false,
    power_steering: data.power_steering ? true : false,
    power_windows: data.power_windows ? true : false,
    immobilizer: data.immobilizer ? true : false,
    sun_roof: data.sun_roof ? true : false,
  });

  // Update Car Details
  const { data: response, error } = await supabase
    .from("cars")
    .update({
      title: data.title,
      make: data.make,
      year: parseInt(data.year),
      city: data.city,
      price: parseInt(data.price),
      features: features,
      description: data.description,
      color: data.color,
      mileage: parseInt(data.milage),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { response, error };
  }

  // Update Images:
  // 1. Fetch currently stored images for this car from the DB to see what we have.
  const { data: dbImages, error: fetchError } = await supabase
    .from("car_images")
    .select("id, image_url")
    .eq("car_id", id);

  if (fetchError) {
    console.error("Error fetching existing images:", fetchError);
    return { response, error: fetchError };
  }

  // 2. Determine which storage files need to be deleted.
  const currentUrls = dbImages.map((img) => img.image_url);
  const newUrlsSet = new Set(imagesUrl);

  const urlsToDelete = currentUrls.filter((url) => !newUrlsSet.has(url));

  if (urlsToDelete.length > 0) {
    const fileNamesToDelete = urlsToDelete
      .map((url) => {
        const parts = url.split("/carImages/");
        return parts.length > 1 ? parts[1] : null;
      })
      .filter((name) => name !== null);

    if (fileNamesToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("carImages")
        .remove(fileNamesToDelete);

      if (storageError) {
        console.error(
          "Error deleting removed files from bucket:",
          storageError,
        );
      }
    }
  }

  // 3. Update the database records

  // 3a. Delete all old association rows
  // We verify what we are deleting by using the IDs we just fetched.
  const idsToDelete = dbImages.map((img) => img.id);

  if (idsToDelete.length > 0) {
    const { error: deleteRowsError } = await supabase
      .from("car_images")
      .delete()
      .in("id", idsToDelete);

    if (deleteRowsError) {
      console.error("Error clearing old image rows:", deleteRowsError);
      return { response, error: deleteRowsError };
    }
  }

  // 3b. Insert new association rows
  if (imagesUrl && imagesUrl.length > 0) {
    const imagesPayload = imagesUrl.map((url, index) => ({
      car_id: id,
      image_url: url,
      position: index,
      is_primary: index === 0,
    }));

    const { error: insertError } = await supabase
      .from("car_images")
      .insert(imagesPayload);

    if (insertError) {
      console.error("Error inserting new images:", insertError);
      return { response, error: insertError };
    }
  }

  return { response, error };
};

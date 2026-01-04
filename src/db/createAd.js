import { supabase } from "../../configs/supabase-config";

const createAd = async function (profile, data, imagesUrl) {
  const features = JSON.stringify({
    ac: data.ac === undefined ? false : true,
    alloy: data.alloy === undefined ? false : true,
    abs: data.abs === undefined ? false : true,
    power_steering: data.power_steering === undefined ? false : true,
    power_windows: data.power_windows === undefined ? false : true,
    immobilizer: data.immobilizer === undefined ? false : true,
    sun_roof: data.sun_roof === undefined ? false : true,
  });

  const { data: carData, error: carError } = await supabase
    .from("cars")
    .insert([
      {
        title: data.title,
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        city: data.city,
        price: parseInt(data.price),
        features: features,
        description: data.description,
        color: data.color,
        mileage: parseInt(data.milage),
        created_at: new Date().toISOString(),
        profile_id: profile.id,
        phone: profile.phone,
      },
    ])
    .select()
    .single();

  if (carError) {
    return { error: carError };
  }

  if (imagesUrl && imagesUrl.length > 0) {
    const imagesPayload = imagesUrl.map((url, index) => ({
      car_id: carData.id,
      image_url: url,
      position: index,
      is_primary: index === 0,
    }));

    const { error: imageError } = await supabase
      .from("car_images")
      .insert(imagesPayload);

    if (imageError) {
      return { error: imageError };
    }
  }

  return { response: carData };
};

export { createAd };

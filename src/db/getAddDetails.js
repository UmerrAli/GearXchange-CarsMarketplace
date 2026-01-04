import { supabase } from "../../configs/supabase-config";

const getAddDetails = async (id) => {
  const { data, error } = await supabase
    .from("cars")
    .select("*, car_images(image_url, position)")
    .eq("id", id)
    .single();

  if (error) {
    return { data: null, error };
  }

  const images = data.car_images
    ? data.car_images
        .sort((a, b) => (a.position || 0) - (b.position || 0))
        .map((img) => img.image_url)
    : [];

  const formattedData = {
    ...data,
    images,
    model: data.year ? data.year.toString() : data.model,
  };

  return { data: formattedData, error: null };
};

export default getAddDetails;

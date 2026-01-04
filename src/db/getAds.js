import { supabase } from "../../configs/supabase-config";

const getAds = async (page = 0, pageSize = 12) => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("cars")
    .select("*, car_images(image_url, position)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return { data: null, error, count: 0 };
  }

  const formattedData = data.map((car) => {
    const images = car.car_images
      ? car.car_images
          .sort((a, b) => (a.position || 0) - (b.position || 0))
          .map((img) => img.image_url)
      : [];

    return {
      ...car,
      images,
      model: car.year ? car.year.toString() : car.model,
    };
  });

  return { data: formattedData, error: null, count };
};

export default getAds;

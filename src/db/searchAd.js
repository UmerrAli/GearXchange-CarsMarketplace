import { supabase } from "../../configs/supabase-config";

export const searchAds = async (filters, page = 0, pageSize = 8) => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("cars")
    .select("*, car_images(image_url, position)", { count: "exact" });

  // Apply filters if they exist
  if (filters.make && filters.make !== "") {
    query = query.eq("make", filters.make);
  }

  if (filters.model && filters.model !== "") {
    query = query.eq("model", filters.model);
  }

  if (filters.year && filters.year !== "") {
    query = query.eq("year", filters.year);
  }

  if (filters.city && filters.city !== "") {
    query = query.eq("city", filters.city);
  }

  if (filters.minPrice && filters.minPrice !== "") {
    query = query.gte("price", parseInt(filters.minPrice));
  }

  if (filters.maxPrice && filters.maxPrice !== "") {
    query = query.lte("price", parseInt(filters.maxPrice));
  }

  console.log(filters);

  // Apply pagination and sorting
  query = query.order("created_at", { ascending: false }).range(from, to);

  const { data, error, count } = await query;

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

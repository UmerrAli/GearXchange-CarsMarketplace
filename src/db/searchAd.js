import { supabase } from "../../configs/supabase-config";

export const searchAds = async (filters) => {
    let query = supabase.from("cars").select("*");

    // Apply filters if they exist
    if (filters.make && filters.make !== "") {
        query = query.eq("make", filters.make);
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

    const { data, error } = await query;
    return { data, error };
};

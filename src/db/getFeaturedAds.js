import { supabase } from "../../configs/supabase-config";

export const getFeaturedAds = async () => {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false }); // Optional: Show newest featured first

    return { data, error };
};

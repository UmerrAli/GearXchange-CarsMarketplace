import { supabase } from "../../configs/supabase-config";

const getAds = async () => {
    const { data, error } = await supabase.from("cars").select("*");
    return { data, error };
}

export default getAds;
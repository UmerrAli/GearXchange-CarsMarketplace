import { supabase } from "../../configs/supabase-config";

const getProfileAds = async function (user) {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user.id);
    return { data, error };
}

export { getProfileAds };
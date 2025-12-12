import { supabase } from "../../configs/supabase-config";

const getProfileAds = async function (user) {
    console.log(user);
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user.id);
    console.log(data);
    return { data, error };
}

export { getProfileAds };
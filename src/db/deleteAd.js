import { supabase } from "../../configs/supabase-config";

export const deleteAd = async (id, userId) => {
    const { data, error } = await supabase
        .from("cars")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

    return { data, error };
};

import { supabase } from "../../configs/supabase-config";

const getAddDetails = async (id) => {
    const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();
    return { data, error }
};

export default getAddDetails;
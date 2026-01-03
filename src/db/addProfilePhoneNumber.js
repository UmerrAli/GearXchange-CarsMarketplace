import { supabase } from "../../configs/supabase-config";

export const addProfilePhoneNumber = async (profile, phoneNumber) => {
    const { data, error } = await supabase
        .from("profiles")
        .update({ phone: phoneNumber })
        .eq("id", profile.id);
    return { data, error };
};

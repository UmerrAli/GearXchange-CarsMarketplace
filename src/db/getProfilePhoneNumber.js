import { supabase } from "../../configs/supabase-config";

export const getProfilePhoneNumber = async (profile) => {
  const { data, error } = await supabase.from("profiles").select("phone").eq("id", profile.id);
  if (error) throw error;
  return data;
};
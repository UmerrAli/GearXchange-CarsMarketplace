import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

// ==================== AUTHENTICATION ====================

export const signUp = async (email, password) => {
  const { data } = await supabase.auth.signUp({
    email,
    password,
  });
  const { data: profile } = await supabase.from("profiles").insert({
    user_id: data.user.id,
    email: email,
  });

  return { user: data.user, profile: profile };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data.user, session: data.session, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export const onAuthStateChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
  return data.subscription.unsubscribe;
};

export { supabase };

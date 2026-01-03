import { useEffect, useState } from "react";
import { supabase } from "../../configs/supabase-config";
import { AuthContext } from "./AuthContext";

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", data.session?.user?.id).single();
        setProfile(profile);
        console.log(profile);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen to auth state changes
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      unsubscribe?.data?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = {
    user,
    loading,
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

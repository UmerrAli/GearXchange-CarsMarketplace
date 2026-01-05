import { useEffect, useState, createContext } from "react";
import { supabase, getUserProfile } from "../../configs/supabase-config";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const handleSession = async (session) => {
      const currentUser = session?.user || null;
      if (!mounted) return;

      setUser(currentUser);

      if (currentUser) {
        const { data: userProfile, error } = await getUserProfile(
          currentUser.id,
        );
        if (mounted && !error) {
          setProfile(userProfile);
        } else if (error) {
          console.error("Profile fetch error:", error);
        }
      } else if (mounted) {
        setProfile(null);
      }
    };

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await handleSession(session);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

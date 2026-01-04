import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    return { user: null, loading: true, profile: null };
  }
  return context;
};

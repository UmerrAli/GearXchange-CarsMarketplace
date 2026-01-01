import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    return { user: null, loading: true };
  }
  return context;
};

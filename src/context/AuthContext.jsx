import { createContext, useContext, useState, useEffect } from "react";
import { checkLoginStatus } from "../lib/actions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkLoginStatus(); 
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, []);

  const login = async () => {
    const data = await checkLoginStatus();
    setUser(data);
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLogin: !!user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

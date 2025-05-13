import { createContext, useContext, useState, useEffect } from "react";
import { fetchUser } from "../lib/data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLogin && !user) {
      fetchUser().then(setUser);
    }
  }, [isLogin, user]);

  const login = () => {
    setIsLogin(true);
    setUser(null);
  };

  const logout = () => {
    setIsLogin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

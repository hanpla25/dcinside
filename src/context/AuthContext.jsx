import { createContext, useContext, useState, useEffect } from "react";
import { handleSignup, handleLogin } from "../lib/actions";
import { checkLoginStatus } from "../lib/data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkLoginStatus();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (loginData) => {
    try {
      await handleLogin(loginData);
      const data = await checkLoginStatus();
      setUser(data);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (signupData) => {
    try {
      await handleSignup(signupData);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLogin: !!user, login, logout, signup, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

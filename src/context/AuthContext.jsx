import { createContext, useContext, useState, useEffect } from "react";
import { handleSignup, handleLogin, handleLogout } from "../lib/actions";
import { fetchUser as apiFetchUser } from "../lib/data";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await apiFetchUser();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (loginData) => {
    try {
      await handleLogin(loginData);
      const data = await apiFetchUser();
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
      await handleLogout();
      setUser(null);
      navigate("/");
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

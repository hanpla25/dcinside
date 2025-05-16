import { createContext, useContext, useState, useEffect } from "react";
import { checkLoginStatus } from "../lib/actions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  useEffect(() => {
    // 앱이 처음 실행될 때 세션 상태 확인
    const fetchUser = async () => {
      try {
        const data = await checkLoginStatus(); // 세션 기반 로그인 확인
        setUser(data); // 로그인된 사용자 정보 저장
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); // 로딩 완료
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

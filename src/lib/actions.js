import axios from "axios";

export const handleSignup = async (data, navigate) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/member/signup",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("회원가입 성공:", res.data);
    navigate("/");
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

export const handleLogin = async (data, navigate) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/member/login",
      data,
      { withCredentials: true }
    );
    console.log("로그인 성공:", res.data);
    navigate("/");
    return res.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

export const checkLoginStatus = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/member", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("로그인 상태 확인 실패:", error);
    return null;
  }
};

export const resign = async () => {
  try {
    const res = await axios.delete("http://localhost:8080/api/member", {
      withCredentials: true,
    });
    console.log("회원 탈퇴 성공:", res.data);
    return res.data;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
};

export const createGallery = async ({ name, abbreviation }) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/category",
      {
        name,
        abbreviation,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("갤러리 생성 요청 실패:", error);
    throw error;
  }
};

export async function updateProfile(formData) {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/member",
      {
        nickname: formData.name,
        userid: formData.userid,
        password: formData.password,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("프로필 수정 실패:", error);
    throw error;
  }
}

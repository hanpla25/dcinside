import axios from "axios";

export const handleSignup = async (data, navigate) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/member/signup",
      data
    );
    console.log("회원가입 성공:", res.data);
    navigate("/");
  } catch (err) {
    console.error("회원가입 실패:", err);
    navigate("/");
  }
};

export const handleLogin = async (data, navigate) => {
  try {
    const res = await axios.post("http://localhost:8080/api/login", data);
    console.log("로그인 성공:", res.data);
    navigate("/");
  } catch (err) {
    console.error("로그인 실패:", err);
    navigate("/");
  }
};

export const createGallery = async ({ name, url }) => {
  try {
    const res = await axios.post("http://localhost:8080/api/gallery", {
      name,
      url,
    });
    return res.data;
  } catch (err) {
    console.error("갤러리 생성 요청 실패:", err);
    throw err;
  }
};

import axios from "axios";

export const handleSignup = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/member/signup",
      data
    );
    console.log("회원가입 성공:", res.data);
  } catch (err) {
    console.error("회원가입 실패:", err);
  }
};

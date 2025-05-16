import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

export const handleSignup = async (data) => {
  const res = await apiClient.post("/member/signup", data);
  return res.data;
};

export const handleLogin = async (data) => {
  const res = await apiClient.post("/member/login", data);
  return res.data;
};

export const resign = async () => {
  const res = await apiClient.delete("/member");
  return res.data;
};

export const createGallery = async ({ name, abbreviation }) => {
  const res = await apiClient.post("/category", { name, abbreviation });
  return res.data;
};

export const updateProfile = async (formData) => {
  const res = await apiClient.put("/member", {
    nickname: formData.name,
    userid: formData.userid,
    password: formData.password,
  });
  return res.data;
};

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

export const handleLogout = async () => {
  const res = await apiClient.post("/member/logout");
  return res.data;
};

export const resign = async () => {
  const res = await apiClient.delete("/member");
  return res.data;
};

export const createGallery = async ({ name, abbr }) => {
  const res = await apiClient.post("/category", { name, abbr });
  return res.data;
};

export const updateProfile = async (formData) => {
  const res = await apiClient.put("/member", {
    userid: formData.userid,
    password: formData.password,
    nickname: formData.name,
    newPassword: formData.nextpassword,
  });
  return res.data;
};

export const handlePost = async (data) => {
  const res = await apiClient.post("/post", data);
  return res.data;
};

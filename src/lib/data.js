import { apiClient } from "./actions";

export const fetchBestPosts = async () => {
  const res = await apiClient.get("/post/best");
  return res.data;
};

export const fetchGalleryList = async () => {
  const res = await apiClient.get("/category");
  return res.data;
};

export const checkLoginStatus = async () => {
  const res = await apiClient.get("/member");
  return res.data;
};

import { apiClient } from "./actions";

export const fetchUser = async () => {
  const res = await apiClient.get("/member");
  return res.data;
};

export const fetchBestPosts = async () => {
  const page = 1;
  const like_cut = 10;
  const res = await apiClient.get("/post", {
    params: { page, like_cut },
  });
  return res.data.posts;
};

export const fetchGalleryList = async () => {
  const res = await apiClient.get("/category");
  return res.data;
};

export const fetchPostList = async ({ abbr, page, like_cut, search }) => {
  const res = await apiClient.get("/post", {
    params: { page, abbr, like_cut, search },
  });
  return res.data;
};

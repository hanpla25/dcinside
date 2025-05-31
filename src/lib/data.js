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

export const fetchPostList = async ({ abbr, page, like_cut, search, size }) => {
  const res = await apiClient.get("/post", {
    params: { page, abbr, like_cut, search, size },
  });
  return res.data;
};

export const fetchPostInfo = async (id) => {
  const res = await apiClient.get(`/post/${id}`);
  return res.data;
};

export const fetchComments = async (id) => {
  const res = await apiClient.get(`/comment/${id}`);
  return res.data;
};

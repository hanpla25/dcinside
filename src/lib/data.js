import axios from "axios";
import {
  galleryList as placeholderGalleryList,
  bestPosts as placeholderBestPosts,
  users as placeholderUsers,
} from "./placeholder-data";

export const fetchBestPosts = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/main/best");
    return res.data;
  } catch (err) {
    console.error("실시간 베스트 요청 실패, placeholder 사용:", err);
    return placeholderBestPosts;
  }
};

export const fetchGalleryList = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/main/galleries");
    return res.data;
  } catch (err) {
    console.error("갤러리 리스트 요청 실패, placeholder 사용:", err);
    return placeholderGalleryList;
  }
};

export async function fetchUser() {
  try {
    const res = await axios.get("http://localhost:8080/api/member");
    return res.data;
  } catch (error) {
    console.warn(
      "서버에서 사용자 정보를 가져오지 못했습니다. placeholder 사용자로 대체합니다."
    );
    return placeholderUsers[0];
  }
}

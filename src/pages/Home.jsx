import { useEffect, useState } from "react";
import BestPosts from "../ui/BestPosts";
import { fetchBestPosts } from "../lib/data";

export default function Home() {
  const [bestPosts, setBestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBestPosts = async () => {
      try {
        const data = await fetchBestPosts();
        setBestPosts(data);
      } catch (err) {
        console.error("실시간 베스트 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBestPosts();
  }, []);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;

  return (
    <div>
      <BestPosts posts={bestPosts} />
    </div>
  );
}

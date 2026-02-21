import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        const apiMessage = err?.response?.data?.message;
        const status = err?.response?.status;
        const networkIssue = !err?.response && err?.request;

        if (apiMessage) {
          setError(apiMessage);
        } else if (status) {
          setError(`Failed to load posts (HTTP ${status}).`);
        } else if (networkIssue) {
          setError("Network error: cannot reach API.");
        } else {
          setError("Failed to load posts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getAuthorName = (user) => {
    if (!user) return "Unknown";
    if (typeof user === "string") return "Unknown";
    return user.name || "Unknown";
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0] text-black">
        <p className="text-lg font-semibold">Loading posts...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
        <p className="text-[#B7410E] font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFFDD0]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-[#B7410E] mb-10">
          All Posts
        </h1>

        {/* Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/posts/${post._id}`}
              className="
                group block rounded-2xl bg-white border border-black/10
                p-6 shadow-md transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-black mb-2 group-hover:text-[#B7410E]">
                {post.title}
              </h2>

              {/* Author */}
              <p className="text-sm mb-3">
                <span className="text-black font-medium">By </span>
                <span className="text-[#C8A2C8] font-semibold">
                  {getAuthorName(post.user)}
                </span>
              </p>

              {/* Content */}
              <p className="text-black/80 line-clamp-3 mb-4">
                {post.content}
              </p>

              {/* Read More */}
              <span className="inline-block mt-auto text-sm font-semibold text-[#B7410E] group-hover:text-[#FFA94D]">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

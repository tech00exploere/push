import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";

export default function CreatePost() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  HARD AUTH GUARD
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      const res = await API.post("/posts", formData);
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-3xl bg-white rounded-3xl p-10
          shadow-xl border border-black/10
        "
      >
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-[#B7410E] mb-1">
          Create New Post
        </h1>
        <p className="text-black/70 mb-8">
          Share your thoughts with the world ✨
        </p>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#C8A2C8]/30 text-black font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a catchy title..."
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-3 rounded-xl text-lg
                border border-black/20
                focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
              "
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Content
            </label>
            <textarea
              name="content"
              placeholder="Write your post here..."
              value={formData.content}
              onChange={handleChange}
              rows={10}
              required
              className="
                w-full px-5 py-3 rounded-xl text-lg resize-none
                border border-black/20
                focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl font-semibold text-white text-lg
              bg-[#B7410E] hover:bg-[#FFA94D]
              transition disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});
  const currentUser = auth?.user || null;
  const token = auth?.token || null;

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  //  Fetch post + check author
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const postUserId =
          typeof res.data.user === "object"
            ? res.data.user?._id
            : res.data.user;

        if (
          !currentUser ||
          !currentUser._id ||
          !postUserId ||
          String(postUserId) !== String(currentUser._id)
        ) {
          navigate("/");
          return;
        }

        setFormData({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Post not found or unauthorized");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token, currentUser, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);

      await API.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(
        err.response?.data?.message ||
          `Failed to update post. Status: ${
            err.response?.status || "unknown"
          }`
      );
    } finally {
      setUpdating(false);
    }
  };

  if (!token || loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
        <p className="font-semibold text-black">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
        <p className="font-semibold text-[#B7410E]">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-black/10 p-10">
        <h1 className="text-4xl font-extrabold text-[#B7410E] mb-8">
          Update Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              autoFocus
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
            disabled={updating}
            className="
              px-8 py-3 rounded-xl font-semibold text-white text-lg
              bg-[#B7410E] hover:bg-[#FFA94D]
              transition disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {updating ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../api/axios";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user: currentUser, token } = useSelector(
    (state) => state.auth || {}
  );

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get(`/posts/${id}`);
        setPost(postRes.data);

        const commentsRes = await API.get(`/posts/${id}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getUserName = (user) => {
    if (!user) return "Unknown";
    return typeof user === "object" ? user.name || "Unknown" : "Unknown";
  };

  const isAuthor = (() => {
    if (!post || !currentUser) return false;

    const postUserId =
      typeof post.user === "object" ? post.user._id : post.user;

    return postUserId?.toString() === currentUser._id?.toString();
  })();

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError("Login to comment.");
    if (!commentText.trim()) return;

    try {
      setCommentLoading(true);
      const res = await API.post(`/posts/${id}/comments`, {
        text: commentText,
      });
      setComments([...comments, res.data]);
      setCommentText("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
        <p className="font-semibold text-black">Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
        <p className="font-semibold text-[#B7410E]">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFFDD0]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* POST */}
        <article className="bg-white rounded-3xl shadow-xl border border-black/10 p-8 mb-12">
          <h1 className="text-4xl font-extrabold text-[#B7410E] mb-2">
            {post.title}
          </h1>

          <p className="text-sm mb-6">
            <span className="text-black">By </span>
            <span className="text-[#C8A2C8] font-semibold">
              {getUserName(post.user)}
            </span>
          </p>

          <div className="text-black/80 whitespace-pre-line leading-relaxed">
            {post.content}
          </div>

          {/* AUTHOR ONLY */}
          {isAuthor && (
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => navigate(`/update-post/${id}`)}
                className="
                  px-5 py-2 rounded-xl font-semibold
                  bg-[#C8A2C8] text-black
                  hover:bg-[#FFA94D] transition
                "
              >
                Update
              </button>

              <button
                onClick={handleDeletePost}
                className="
                  px-5 py-2 rounded-xl font-semibold text-white
                  bg-[#B7410E] hover:bg-[#FFA94D]
                  transition
                "
              >
                Delete
              </button>
            </div>
          )}
        </article>

        {/* COMMENTS */}
        <section className="bg-[#FFFDD0] rounded-3xl">
          <h2 className="text-2xl font-bold text-[#B7410E] mb-4">
            Comments
          </h2>

          {comments.length === 0 ? (
            <p className="text-black/60 italic mb-6">
              No comments yet.
            </p>
          ) : (
            <ul className="space-y-4 mb-6">
              {comments.map((c) => (
                <li
                  key={c._id}
                  className="bg-white p-4 rounded-2xl border border-black/10"
                >
                  <p className="text-black mb-1">{c.text}</p>
                  <span className="text-sm text-[#C8A2C8] font-medium">
                    - {getUserName(c.author)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* ADD COMMENT */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                setError("");
              }}
              rows="3"
              placeholder={token ? "Write a comment..." : "Login to comment..."}
              disabled={!token || commentLoading}
              className="
                w-full px-4 py-3 rounded-xl resize-none
                border border-black/20
                focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
              "
            />

            {error && (
              <p className="mt-2 text-sm font-medium text-[#B7410E]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!token || commentLoading}
              className="
                mt-4 px-6 py-2 rounded-xl font-semibold text-white
                bg-[#B7410E] hover:bg-[#FFA94D]
                transition disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {commentLoading ? "Posting..." : "Add Comment"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

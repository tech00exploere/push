import { useState, useEffect } from "react";
import { addComment, deleteComment, getComments } from "../features/comments/commentAPI";
import { useSelector } from "react-redux";

export default function Comment({ post }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const { token, user } = useSelector((state) => state.auth);

  // Fetch comments when component mounts or post changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(post._id);
        setComments(data);
      }catch(err){
        console.error(err);
      }
    };
    fetchComments();
  }, [post._id]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    try {
      const createdComment = await addComment(post._id, text);
      setComments((prev) => [createdComment, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updated = await deleteComment(post._id, id);
      setComments(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold text-black mb-4">Comments</h3>

      {token ? (
        <div className="mb-6 bg-[#f7f1e8] p-4 rounded-xl border border-black/5">
          <textarea
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#c8b6e2] resize-none"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts..."
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleAdd}
              disabled={!text.trim()}
              className="bg-[#b04a2f] text-black px-5 py-2 rounded-xl font-semibold hover:bg-[#9b3f27] disabled:opacity-50 transition"
            >
              Post Comment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-6 italic">Login to join the discussion.</p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet. Be the first one!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-black/5 rounded-xl p-4 shadow-sm flex justify-between gap-4"
            >
              <div>
                <p className="text-gray-800">{c.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  - {c.author?.name || "Anonymous"}
                </p>
              </div>

              {token && user?._id === c.author?._id && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-sm text-[#b04a2f] hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import API from "../../api/axios";

// Get all comments for a post
export const getComments = async (postId) => {
  try {
    const res = await API.get(`/posts/${postId}/comments`);
    return res.data; // array of comments
  } catch (err) {
    console.error("Get comments error:", err.response?.data || err.message);
    throw err;
  }
};

// Add a new comment
export const addComment = async (postId, text) => {
  try {
    const res = await API.post(`/posts/${postId}/comments`, { text });
    return res.data; // updated comments array
  } catch (err) {
    console.error("Add comment error:", err.response?.data || err.message);
    throw err;
  }
};

// Delete a comment
export const deleteComment = async (postId, commentId) => {
  try {
    const res = await API.delete(`/posts/${postId}/comments/${commentId}`);
    return res.data; // updated comments array
  } catch (err) {
    console.error("Delete comment error:", err.response?.data || err.message);
    throw err;
  }
};

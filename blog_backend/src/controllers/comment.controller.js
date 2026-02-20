import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import Post from "../models/Post.model.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * GET all comments for a post
 * GET /api/posts/:postId/comments
 */
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!isValidId(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

/**
 * ADD a comment
 * POST /api/posts/:postId/comments
 */
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!isValidId(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      text: text.trim(),
      post: postId,
      author: req.user._id,
    });

    const populatedComment = await comment.populate("author", "name");

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

/**
 * DELETE a comment
 * DELETE /api/posts/:postId/comments/:commentId
 */
export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    if (!isValidId(postId) || !isValidId(commentId)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const comment = await Comment.findOne({ _id: commentId, post: postId });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    const remainingComments = await Comment.find({ post: postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(remainingComments);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

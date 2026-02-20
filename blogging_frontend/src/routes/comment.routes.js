import express from "express";
import { getComments, addComment, deleteComment } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });

// Get all comments for a post
router.get("/:postId/comments", getComments);

// Add a new comment (protected)
router.post("/:postId/comments", protect, addComment);

// Delete a comment (protected, author only)
router.delete("/:postId/comments/:commentId", protect, deleteComment);

export default router;

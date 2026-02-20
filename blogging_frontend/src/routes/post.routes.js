import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getPosts);        // Get all posts
router.get("/:id", getPostById);  // Get a single post by ID

// Protected Routes (require login)
router.post("/", protect, createPost);      // Create new post
router.put("/:id", protect, updatePost);    // Update post (author only)
router.delete("/:id", protect, deletePost); // Delete post (author only)

export default router;

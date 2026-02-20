import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);   // REQUIRED
router.delete("/:id", protect, deletePost);

export default router;

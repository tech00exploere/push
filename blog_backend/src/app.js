import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors({ origin: "https://commitpost-04-kcbp.vercel.app" })); // Allow your frontend domain

// Routes
app.use("/api/auth", authRoutes);         // /api/auth/register, /api/auth/login
app.use("/api/posts", postRoutes);        // /api/posts, /api/posts/:id
app.use("/api/posts", commentRoutes);     // /api/posts/:postId/comments

// Health check (optional)
app.get("/", (req, res) => res.send("API is running"));

export default app;

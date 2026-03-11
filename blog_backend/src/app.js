import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";

dotenv.config();
const app = express();

// Allow your frontend origin (Vercel)
app.use(cors({ origin: "https://commitpost-04-kcbp.vercel.app" }));
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

export default app;

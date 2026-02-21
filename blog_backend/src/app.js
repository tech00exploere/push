import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const normalizeOrigin = (value) => value.trim().replace(/\/+$/, "");

const envOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGINS,
]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map((value) => normalizeOrigin(value))
  .filter(Boolean);

const allowedOriginSet = new Set([
  "http://localhost:5173",
  "https://pushcommitpost.vercel.app",
  ...envOrigins,
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOriginSet.has(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);

export default app;


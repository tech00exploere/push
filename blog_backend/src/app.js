import express from "express";
import cors from "cors";

import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/* ---------------- ORIGIN HELPER ---------------- */

const normalizeOrigin = (value) =>
value?.trim().replace(//+$/, "");

/* ---------------- ENV ORIGINS ---------------- */

const envOrigins = [
process.env.CLIENT_URL,
process.env.FRONTEND_URL,
process.env.CORS_ORIGINS,
]
.filter(Boolean)
.flatMap((value) => value.split(","))
.map((value) => normalizeOrigin(value))
.filter(Boolean);

/* ---------------- ALLOWED ORIGINS ---------------- */

const allowedOriginSet = new Set([
"http://localhost:5173",
"https://pushcommitpost.vercel.app",
"https://commitpost-04-kcbp.vercel.app",
...envOrigins,
]);

console.log("[CORS] Allowed origins:", [...allowedOriginSet]);

/* ---------------- CORS CONFIG ---------------- */

const corsOptions = {
origin: (origin, callback) => {
if (!origin) return callback(null, true);

```
const normalizedOrigin = normalizeOrigin(origin);

if (allowedOriginSet.has(normalizedOrigin)) {
  return callback(null, true);
}

console.warn(`[CORS] Blocked origin: ${origin}`);
return callback(new Error("Not allowed by CORS"));
```

},
credentials: true,
methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());

/* ---------------- ROOT ROUTE ---------------- */

app.get("/", (req, res) => {
res.send("CommitPost API running 🚀");
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/api/health", (req, res) => {
res.status(200).json({ ok: true });
});

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);

export default app;

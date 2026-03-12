import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();

const allowedOrigins=["http://localhost:5173",/\.vercel\.app$/];

app.use(cors({
origin:(origin,callback)=>{
if(!origin)return callback(null,true);
const allowed=allowedOrigins.some(o=>o instanceof RegExp?o.test(origin):o===origin);
if(allowed)return callback(null,true);
callback(new Error("Not allowed by CORS"));
},
credentials:true
}));

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/posts",commentRoutes);

export default app;

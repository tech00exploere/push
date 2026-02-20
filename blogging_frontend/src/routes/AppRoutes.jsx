import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/CreatePost";
import PostDetail from "../pages/PostDetail";
import UpdatePost from "../pages/UpdatePost";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      {/* Protected Routes */}
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-post/:id"
        element={
          <ProtectedRoute>
            <UpdatePost />
          </ProtectedRoute>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="text-center py-20 text-gray-500 text-2xl font-semibold">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

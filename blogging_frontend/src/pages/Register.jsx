import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0] px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md bg-white rounded-3xl p-8
          shadow-xl border border-black/10
        "
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-[#B7410E] text-center mb-1">
          Create Account
        </h2>

        <p className="text-sm text-black/70 text-center mb-6">
          Start sharing your thoughts ✨
        </p>

        {/* Error */}
        {isError && (
          <div className="mb-5 p-3 rounded-xl bg-[#C8A2C8]/30 text-black text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-black mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 rounded-xl
              border border-black/20
              focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
            "
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-black mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 rounded-xl
              border border-black/20
              focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
            "
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-black mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 rounded-xl
              border border-black/20
              focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full py-3 rounded-xl font-semibold text-white text-lg
            bg-[#B7410E] hover:bg-[#FFA94D]
            transition disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-sm text-black/70 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="
              text-[#B7410E] font-semibold cursor-pointer
              hover:text-[#FFA94D] hover:underline
            "
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isError, error, token } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/", { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  };

  if (token) return null;

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
          Welcome Back
        </h2>
        <p className="text-center text-black/70 mb-6">
          Login to continue writing 
        </p>

        {/* Error */}
        {isError && (
          <div className="mb-5 p-3 rounded-xl bg-[#C8A2C8]/30 text-black text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-black mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-3 rounded-xl
              border border-black/20
              focus:outline-none focus:ring-2 focus:ring-[#C8A2C8]
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full py-3 rounded-xl font-semibold text-white text-lg
            bg-[#B7410E] hover:bg-[#FFA94D]
            transition disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-black/70 mt-6">
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            className="
              text-[#B7410E] font-semibold cursor-pointer
              hover:text-[#FFA94D] hover:underline
            "
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}

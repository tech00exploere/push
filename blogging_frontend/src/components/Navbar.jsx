import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-[#0f0f0f] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="CommitPost Logo"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-2xl font-bold tracking-wide text-[#B7410E] hidden sm:block">
            CommitPost
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-[#FFA94D] transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/create-post"
                className="text-gray-300 hover:text-[#FFA94D] transition"
              >
                Create Post
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-white/15
                           hover:border-[#B7410E] hover:text-[#B7410E]
                           transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-[#FFA94D] transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-[#B7410E]
                           text-white font-semibold hover:bg-[#FFA94D]
                           transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

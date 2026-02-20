import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Top Divider */}
        <div className="border-t border-white/10 mb-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <h3 className="text-xl text-orange-700 font-semibold tracking-wide">
              CommitPost
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm">
              A modern blogging platform built with React, Node, and MongoDB.
              Share ideas. Start conversations.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} BlogApp. All rights reserved.
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-3 rounded-full bg-white/5
                              group-hover:bg-[#b04a2f]
                              transition">
                <FaGithub size={18} />
              </div>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-3 rounded-full bg-white/5
                              group-hover:bg-[#b04a2f]
                              transition">
                <FaLinkedin size={18} />
              </div>
            </a>

            <a
              href="mailto:youremail@example.com"
              className="group"
            >
              <div className="p-3 rounded-full bg-white/5
                              group-hover:bg-[#b04a2f]
                              transition">
                <FaEnvelope size={18} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

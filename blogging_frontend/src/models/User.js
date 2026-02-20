import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export const currentUser = {
  _id: "u123",
  name: "Priyanshu",
  email: "test@example.com",
  token: "jwt-token-here", // from login
};

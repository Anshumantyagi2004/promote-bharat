import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    phone: String,

    password: String,

    role: {
      type: String,
      enum: ["buyer", "supplier"],
      default: "buyer",
    },

    company: String,
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    phone: String,

    otherEmail: {
      type: String,
      unique: true,
    },

    otherPhone: String,

    password: String,

    role: {
      type: String,
      enum: ["buyer", "supplier"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);
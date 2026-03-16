import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://anshutyagi799_db_user:eY7f8zXcAvYEx3UK@cluster0.hn5ewin.mongodb.net/Promote-Bharat";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
};
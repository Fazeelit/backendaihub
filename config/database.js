import mongoose from "mongoose";
import "./loadEnv.js";

const dbConnect = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGO_URI_DIRECT;

  if (!mongoUri) {
    console.error(
      "MongoDB URI is missing. Set MONGO_URI or MONGO_URI_DIRECT in backend/.env or .env",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;

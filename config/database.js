import mongoose from "mongoose";
import { getMongoUri, getMongoUriCandidates } from "./env.js";

const logConnectionError = (error, attemptedUri, hasDirectFallback) => {
  console.error("MongoDB connection failed:", error.message);

  if (
    error.message.includes("querySrv") &&
    attemptedUri.startsWith("mongodb+srv://")
  ) {
    console.error(
      hasDirectFallback
        ? "SRV DNS lookup failed. The app will use MONGO_URI_DIRECT if it is available."
        : "SRV DNS lookup failed. Add a standard Atlas connection string to MONGO_URI_DIRECT and restart.",
    );
  }
};

const dbConnect = async () => {
  const mongoUri = getMongoUri();
  const mongoUriCandidates = getMongoUriCandidates();

  if (!mongoUri) {
    console.error(
      "MongoDB URI is missing. Set MONGO_URI, MONGO_URI_DIRECT, MONGODB_URI, or DATABASE_URL in Render environment variables or your local .env file.",
    );
    process.exit(1);
  }

  for (let index = 0; index < mongoUriCandidates.length; index += 1) {
    const candidate = mongoUriCandidates[index];
    const hasDirectFallback = mongoUriCandidates.some(
      (uri) => uri !== candidate && uri.startsWith("mongodb://"),
    );

    try {
      await mongoose.connect(candidate);
      console.log("MongoDB connected successfully");

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
      });

      return;
    } catch (error) {
      logConnectionError(error, candidate, hasDirectFallback);

      if (index < mongoUriCandidates.length - 1) {
        console.warn("Trying next MongoDB connection string...");
      }
    }
  }

  process.exit(1);
};

export default dbConnect;

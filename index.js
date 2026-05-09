import express from "express";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import "./config/loadEnv.js";

// ------------------ Database ------------------
import dbConnect from "./config/database.js";
dbConnect();

// ------------------ Config ------------------
import config from "./config/config.js";

// ------------------ Routes ------------------
import adminRoutes from "./routes/adminroute.js";
import onboardingRoutes from "./routes/onboardingroute.js";
import userDashboardRoutes from "./routes/userdashboardroute.js";
import userRoutes from "./routes/usersroute.js";

const app = express();

/*
=====================================================
 CORS Middleware (LAN Safe Production Version)
=====================================================
*/
// ------------------ CORS Setup ------------------
const normalizeOrigin = (origin) => origin.replace(/\/+$/, "");

const allowedOrigins = [
  "http://localhost:3000",
  "https://aihubfrontend1.vercel.app/",
  ...config.webAppUrl,
]
  .filter(Boolean)
  .map(normalizeOrigin);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server requests and same-origin tools with no Origin header.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/*
=====================================================
 Express Middleware
=====================================================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*
=====================================================
 Root Route
=====================================================
*/

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

/*
=====================================================
 API Routes
=====================================================
*/

app.use("/api/admin", adminRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/userdashboard", userDashboardRoutes);
app.use("/api/users", userRoutes);

/*
=====================================================
 404 API Handler
=====================================================
*/

app.all(/^\/api\/.*/, (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

/*
=====================================================
 Global Error Handler
=====================================================
*/

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/*
=====================================================
 Server Start
=====================================================
*/

const PORT = config.port || 8080;
const HOST = "0.0.0.0";

const server = http.createServer(app);

server.timeout = 5 * 60 * 1000;

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

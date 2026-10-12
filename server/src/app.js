import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin || origin === config.CLIENT_ORIGIN) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"]
  }));
  app.use(express.json({ limit: "20kb", strict: true }));
  app.use("/api", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests. Please try again later." }
  }));
  app.get("/api/health", (_req, res) => res.status(200).json({ status: "ok" }));
  app.use("/api", (_req, res) => res.status(404).json({ error: "API endpoint not found." }));
  app.use((err, _req, res, _next) => {
    if (err.message === "Origin not allowed by CORS") {
      return res.status(403).json({ error: "This origin is not allowed." });
    }
    if (err.type === "entity.too.large") {
      return res.status(413).json({ error: "Request body is too large." });
    }
    if (err instanceof SyntaxError && "body" in err) {
      return res.status(400).json({ error: "Invalid JSON body." });
    }
    if (config.NODE_ENV !== "production") console.error(err);
    return res.status(500).json({ error: "An unexpected server error occurred." });
  });
  return app;
}

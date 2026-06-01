import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { expressApp } from "./server/app.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Main API routes for development and production
app.use(expressApp);

// Serve static assets in production
app.use(express.static(path.join(__dirname, "dist")));

// Fallback all frontend routes to Vite's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running in production mode on http://0.0.0.0:${PORT}`);
});

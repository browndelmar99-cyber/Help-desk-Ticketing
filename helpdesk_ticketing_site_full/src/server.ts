import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tickets } from "./routes/tickets";
import { admin } from "./routes/admin";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN?.split(",") || true }));

app.get("/health", (_req, res) => res.send("ok"));

app.use("/api/tickets", tickets);
app.use("/api/admin", admin);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.join(__dirname, "web", "dist");
app.use(express.static(webRoot));
app.get("*", (_req, res) => res.sendFile(path.join(webRoot, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on :${PORT}`));

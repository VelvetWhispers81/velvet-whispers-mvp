app.get("/", (req, res) => {
  res.send("Velvet Whispers backend is live");
});const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Basic health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Fallback route (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Velvet Whispers backend is live");
});
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ⭐ REQUIRED ROOT ROUTE — FIXES "Not Found"
app.get("/", (req, res) => {
  res.send("Velvet Whispers backend is live");
});

// ⭐ Your API routes go BELOW this line
// Example:
// app.use("/api/auth", authRoutes);
// app.use("/api/stream", streamRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

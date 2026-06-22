const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Render gives the port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

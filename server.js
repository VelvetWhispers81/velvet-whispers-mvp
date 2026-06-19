import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Velvet Whispers backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

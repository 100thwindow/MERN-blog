const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes.js");
const authRoutes = require("./routes/auth");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://mern-blog-gray-pi.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
  
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    status: "up",
    timestamp: new Date().toISOString(),
  });
});

// Use Routes
app.use("/api/posts", postRoutes);

// Use Auth Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

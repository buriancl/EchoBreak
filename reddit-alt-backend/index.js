const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts"); // Import routes

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("EchoBreak is live!");
});

// Use post routes
app.use(postRoutes); // Mount all routes from posts.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`EchoBreak server running on port ${PORT}`));

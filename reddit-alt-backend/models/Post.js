const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String }, // Text or link
  community: { type: String, required: true }, // e.g., "tech", "memes"
  votes: { type: Number, default: 0 },
  userId: { type: String, required: true }, // Anonymous handle or ID
  createdAt: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false }, // For moderation queue
});

module.exports = mongoose.model("Post", PostSchema);

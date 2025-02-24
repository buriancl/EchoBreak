const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Adjust path to reach models folder
const Filter = require("bad-words");
const filter = new Filter();

// Create a post with light AI flagging
router.post("/communities/:community/posts", async (req, res) => {
  const { title, content, userId } = req.body;
  const community = req.params.community;

  // Basic "AI" moderation - flags violence/illegal keywords
  const violenceKeywords = ["kill", "bomb", "shoot"];
  const textToCheck = `${title} ${content || ""}`.toLowerCase();
  const isFlagged =
    violenceKeywords.some((keyword) => textToCheck.includes(keyword)) ||
    filter.isProfane(textToCheck);

  try {
    const post = new Post({
      title,
      content,
      community,
      userId,
      flagged: isFlagged,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get posts for a community (sorted by votes)
router.get("/communities/:community/posts", async (req, res) => {
  const community = req.params.community;
  try {
    const posts = await Post.find({ community, flagged: false }).sort({
      votes: -1,
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Vote on a post
router.put("/posts/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { direction } = req.body; // "up" or "down"
  try {
    const update =
      direction === "up" ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };
    const post = await Post.findByIdAndUpdate(id, update, { new: true });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to vote" });
  }
});

// Moderation queue (for flagged posts)
router.get("/moderation/queue", async (req, res) => {
  try {
    const flaggedPosts = await Post.find({ flagged: true });
    res.json(flaggedPosts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch queue" });
  }
});

module.exports = router; // Export the router

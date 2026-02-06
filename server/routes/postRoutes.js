const express = require("express");
const Post = require("../models/post");

const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// GET all posts (no auth required)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username") // Add this to get author details
      .sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error); // Debug log for Render logs
    res
      .status(500)
      .json({ error: error.message || "Server error while fetching posts" });
  }
});
// GET a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE a new post (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user.userId, // Set from auth middleware
    });
    await newPost.save();

    // Populate author details before sending response
    await newPost.populate("author", "username");
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE a post (auth + ownership required)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You can only edit your own posts" });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author", "username");

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a post (auth + ownership required)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

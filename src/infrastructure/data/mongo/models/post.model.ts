import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  likes: {
    count: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
  },
  comments: {
    type: [String],
    default: [],
  },
  img: {
    type: String,
    default: '',
  }
});

export const PostModel = mongoose.model('Post', postSchema);
const { Schema, model } = require("mongoose");

const UserPostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  author: { type: String },
  post_text: { type: String, required: true },
  commentaries: {
    amount: { type: Number, default: 0 },
    commentaries: [],
    users: []
  },
  likes: {
    amount: { type: Number, default: 0 },
    users: [],
  },
});

module.exports = model("UserPost", UserPostSchema);

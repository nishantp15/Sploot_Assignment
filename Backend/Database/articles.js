const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    author: {
        _id: mongoose.Types.ObjectId,
        name: String,
    }
  },
  { timestamps: true }
);

const articleModel = mongoose.model('article', articleSchema);

module.exports = {articleModel}
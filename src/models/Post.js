const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    company: String,
    city: String,
    description: String,
    category: [String],
    thumbnail: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

PostSchema.virtual("thumbnail_url").get(function() {
  return `http://192.168.100.8:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Post", PostSchema);

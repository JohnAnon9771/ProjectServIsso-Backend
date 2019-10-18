const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    city: String,
    category: [String],
    thumbnail: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

PostSchema.virtual("thumbnail_url").get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Post", PostSchema);

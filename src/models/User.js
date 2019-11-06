const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    pwd: {
      type: String,
      select: false
    },
    photo: String,
    profession: String
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.virtual("photo_url").get(function() {
  return `http://localhost:3333/files/${this.photo}`;
});

module.exports = mongoose.model("User", UserSchema);

const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    company: String,
    city: String,
    category: [String],
    thumbnail: String
}, {
    toJSON: {
        virtuals: true
    }
})

PostSchema.virtual('thumbnail_url').get(function () {
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Post', PostSchema)
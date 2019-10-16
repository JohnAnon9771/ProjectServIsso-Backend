const mongoose =  require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    pwd: {
        type: String,
        select: false
    },
    profession: String,
})

module.exports = mongoose.model('User', UserSchema)
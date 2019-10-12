const mongoose =  require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    profession: String,
    email: String,
    pwd: String,
})

module.exports = mongoose.model('User', UserSchema)
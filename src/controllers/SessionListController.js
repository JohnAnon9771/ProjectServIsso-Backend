const User = require('../models/User')

module.exports = {
    async index(req, res) {

        const users = await User.find({ _id })
        return res.json(users) 
    }
}
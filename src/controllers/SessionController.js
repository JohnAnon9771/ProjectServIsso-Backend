const User = require('../models/User')
//index, show, store, update, destroy
module.exports = {
    async store(req, res){
        // recuperar os campos
        const { name, email, pwd } = req.body
        const { profession } = req.body
        //procurar se os campos existem
        let user = await User.findOne({ email })
        //se não existir, crie
        if(!user){
            user = await User.create({ name, profession, email, pwd})
        }

        return res.json(user)
    }
}
const User = require('../models/User')
//index, show, store, update, destroy

module.exports = {
    //Apenas para desenvolvimento
    async index(req, res) {
        // procurar todo o objeto de usuarios
        const data = await User.find({})
        return res.json(data)
    },

    async store(req, res) {
        // recuperar os campos
        const { name, profession, email, pwd } = req.body
        //procurar se os campos existem
        let user = await User.findOne({ email })
        //se não existir, crie
        if (!user) {
            user = await User.create({ name, profession, email, pwd })
        }

        return res.json(user)
    },

    async update(req, res) {
        // obter o id atravas do req.headers
        const { user_id } = req.headers
        // verificar se o usuario existe através do id
        if (!user_id) {
            return res.status(400).json('User not exist')
        }
        else {
            // obter novos valores atraves do headers
            const { name, profession, email, pwd } = req.headers
            // obter os dados do id... name, profession...
            const data = await User.findById(user_id)
            // trocar os valores antigos pelo os novos
            const users = await data.updateOne({
                name,
                profession,
                email,
                pwd
            })

            return res.json(users)
        }
    },
}
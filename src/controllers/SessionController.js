const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json')
//index, show, store, update, destroy

module.exports = {
  async show(req, res) {
    //Apenas para desenvolvimento
    // procurar todo o objeto de usuarios
    //const { user_id } = req.headers
    //const data = await User.findById(user_id)
    const data = await User.find({}).select("+pwd");
    return res.json(data);
  },

  async store(req, res) {
    // recuperar os campos
    const { name, email, pwd, profession } = req.body;
    //procurar se os campos existem
    let user = await User.findOne({ email });
    //se não existir, crie
    if (!user) {
      user = await User.create({ name, email, pwd, profession });
    } else {
      return res.status(400).json({ error: "Email already exists" });
    }

    return res.json({
      user,
      token: jwt.sign({ _id: user._id }, authConfig.secret, {
        expiresIn: 86400
      })
    });
  },

  async update(req, res) {
    // obter o id atravas do req.headers
    const { user_id } = req.headers;
    // verificar se o usuario existe através do id
    if (!user_id) {
      return res.status(400).json("User not exist");
    } else {
      // obter novos valores atraves do headers
      const { name, profession, email, pwd } = req.headers;
      // obter os dados do id... name, profession...
      const data = await User.findById(user_id);
      // trocar os valores antigos pelo os novos
      const users = await data.updateOne({
        name,
        profession,
        email,
        pwd
      });

      return res.json(users);
    }
  },

  async destroy(req, res) {
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(400).json({ message: "Nonexistent user" });
    } else {
      const user = await User.findById(user_id);
      const response = await user.deleteOne({});
      return res.json(response);
    }
  }
};

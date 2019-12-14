const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth.json');
// index, show, store, update, destroy

module.exports = {
	async index(req, res) {
		// Apenas para desenvolvimento
		// procurar todo o objeto de usuarios
		// const { user_id } = req.headers
		// const data = await User.findById(user_id)
		const data = await User.find({}).select('+pwd');
		return res.json(data);
	},
	async indexUserFiltred(req, res) {
		const { profession } = req.params;
		const response = await User.find({ profession });
		return res.json(response);
	},
	async show(req, res) {
		const { id } = req.params;
		const response = await User.findById(id);
		return res.json(response);
	},
	async store(req, res) {
		// recuperar os campos
		const {
			name,
			email,
			pwd,
			profession,
			description,
			phoneNumber,
			city
		} = req.body;

		const { filename } = req.file;
		// procurar se os campos existem
		let user = await User.findOne({ email });
		// se não existir, crie
		if (!user) {
			user = await User.create({
				name,
				email,
				pwd,
				photo: filename,
				profession,
				description,
				phoneNumber,
				city
			});
		} else {
			return res.status(400).json({ error: 'Email already exists' });
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
			return res.status(400).json('User not exist');
		}
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
	},

	async destroy(req, res) {
		const { user_id } = req.headers;

		if (!user_id) {
			return res.status(400).json({ message: 'Nonexistent user' });
		}
		const user = await User.findById(user_id);
		const response = await user.deleteOne({});
		return res.json(response);
	}
};

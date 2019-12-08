const User = require('../models/User');
const authConfig = require('../config/auth.json');

const jwt = require('jsonwebtoken');

module.exports = {
	async store(req, res) {
		const { email, pwd } = req.body;

		const user = await User.findOne({ email }).select('+pwd');
		if (!user) {
			return res.status(400).json({ error: 'User not exists' });
		}
		if (pwd !== user.pwd) {
			return res.status(400).json({ error: 'invalid password' });
		}

		user.pwd = undefined;
		return res.json({
			user,
			token: jwt.sign({ _id: user._id }, authConfig.secret, {
				expiresIn: 86400
			})
		});
	}
};

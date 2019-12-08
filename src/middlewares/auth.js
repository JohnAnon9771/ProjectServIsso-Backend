const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: 'No token provided' });
	}

	const parts = authorization.split(' ');
	if (!parts.length === 2) {
		return res.status(401).json({ error: 'Token error' });
	}

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: 'Token malformated' });
	}

	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' });
		}

		req.userId = decoded._id;
		return next();
	});
};

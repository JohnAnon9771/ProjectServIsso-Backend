const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
		},
		filename: (req, file, cb) => {
			const ext = path.extname(file.originalname);
			const name = path.basename(file.originalname, ext);

			cb(null, `${name}-${Date.now()}${ext}`);
		}
	}),
	limits: {
		fileSize: 2 * 1024 * 1024
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type.'));
		}
	}
};

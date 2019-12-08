const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		pwd: {
			type: String,
			select: false
		},
		photo: String,
		profession: String,
		description: String,
		phoneNumber: String,
		city: String
	},
	{
		toJSON: {
			virtuals: true
		}
	}
);

UserSchema.virtual('photo_url').get(function() {
	return `https://servisso-api.herokuapp.com/files/${this.photo}`;
});

module.exports = mongoose.model('User', UserSchema);

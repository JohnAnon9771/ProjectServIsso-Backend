const User = require("../models/User");

module.exports = {
  async show(req, res, next) {
    const { name, email, profession } = await User.findById(req.userId);
    return res.json({ user_id: req.userId, name, email, profession });
  }
};

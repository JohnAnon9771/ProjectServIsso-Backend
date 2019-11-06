const User = require("../models/User");

module.exports = {
  async show(req, res, next) {
    const response = await User.findById(req.userId);
    return res.json(response);
  }
};

const Company = require("../models/Company");

module.exports = {
  async store(req, res) {
    const { name, email, pwd, category } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      company = await Company.create({ name, email, pwd, category });
    } else {
      return res.status(400).json({ error: "Company does not exist" });
    }
  },

  async show(req, res) {
    const { company_id } = req.headers;

    const company = await Company.findById(company_id);
    if (!company) {
      return res
        .status(400)
        .json({ error: "There is no company with this id" });
    } else {
      return res.json(company);
    }
  },

  async index(req, res) {
    const company = await Company.find({});
    return res.json(company);
  }
};

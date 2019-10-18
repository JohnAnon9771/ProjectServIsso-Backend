const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  category: [String]
});

module.exports = mongoose.model("Company", CompanySchema);

const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const posts = await Post.find({});
    return res.json(posts);
  },

  async show(req, res) {
    const { category } = req.query;
    const posts = await Post.find({ category: category });
    return res.json(posts);
  },

  async store(req, res) {
    const { company_id } = req.headers
    const { city, category } = req.body;
    const { filename } = req.file;

    const post = await Post.create({
      company: company_id,
      thumbnail: filename,
      city,
      category: category.split(",").map(category => category.trim())
    });
    return res.json(post);
  },

  async update(req, res) {
    const { post_id } = req.headers;

    if (!post_id) {
      return res.status(400).json("Post not exist");
    } else {
      const { category, company, city } = req.headers;
      const data = await Post.findById(post_id);
      const posts = await data.updateOne({
        category: category.split(",").map(category => category.trim()),
        company,
        city
      });

      return res.json(posts);
    }
  },

  async destroy(req, res) {
    const { post_id } = req.headers;

    if (!post_id) {
      return res.status(400).json("Post does not exist so it can be deleted");
    } else {
      const data = await Post.findById(post_id);
      const posts = await data.deleteOne({});
      return res.json(posts);
    }
  }
};

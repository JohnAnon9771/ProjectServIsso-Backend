const Post = require('../models/Post')

module.exports = {
    async index(req, res){
        const { category } = req.params
        
        const posts = await Post.find({ categorys: category })
        return res.json(posts)
    },

    async store(req, res) {
        const { company, city, categorys } = req.body
        const { filename } = req.file

        const post = await Post.create({
            thumbnail: filename,
            company,
            city,
            categorys: categorys.split(',').map(category => category.trim())
        })
        return res.json(post)
    }
}
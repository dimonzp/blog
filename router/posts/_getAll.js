const Post = require('../../models/Post')

const getAllPosts = (req, res, next) => {
	let query = {}
	req.query.postedBy && (query.postedBy = req.query.postedBy)
	Post.find(query, (err, posts) => (err ? next(err) : res.json(posts)))
}

module.exports = getAllPosts

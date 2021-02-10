const User = require('../../models/User')

const getAllUsers = (req, res, next) =>
	User.find({}, { password: 0 }, (err, users) =>
		err ? next(err) : res.json(users)
	)

module.exports = getAllUsers

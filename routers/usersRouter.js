const usersRouter = require("express").Router();
const {getUsers} = require('../constrollers/users.controller')

usersRouter.route('/').get(getUsers);

module.exports = usersRouter
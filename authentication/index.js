const express = require("express")
const globalConstants = require('../constants/constants')
const { loginRoute, registerRoute, recoveryRoute, logoutRoute } = require('./route/route')


const auth = express.Router()

auth.use("/login", loginRoute)
auth.use("/register", registerRoute)
auth.use("/recovery", recoveryRoute)
auth.use('/logout', logoutRoute)
module.exports = auth;
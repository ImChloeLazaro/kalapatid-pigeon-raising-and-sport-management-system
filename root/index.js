const express = require("express")
const globalConstants = require("../constants/constants")
const { verifyLogin } = require("../lib/toolkit")

const root = express.Router()

root.get("/", (req, res) => {
	return (req.session.isAuthenticated) ? res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home') : res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/login')
})
root.get("/home", (req, res) => {
	verifyLogin(req, res, (username) => {
		return res.render("index.html", {
			ctx: globalConstants.ctx,
			username: username
		})
	})

})


module.exports = root;







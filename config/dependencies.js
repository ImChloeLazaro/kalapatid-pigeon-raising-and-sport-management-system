require("dotenv").config()
const path = require("path")
const session = require("express-session")
const nunjucks = require("nunjucks")
const logger = require('morgan')



const config = (app, express, constants, dirname) => {
	nunjucks.configure(path.resolve(dirname, constants.VIEW_FOLDER), {
		express: app,
		autoscape: true,
		noCache: false,
		watch: true
	})

	app.use(logger('dev', {}))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use(session({
		secret: constants.SESSION_SECRET,
		saveUninitialized: false,
		resave: false
	}))
	app.use(express.static(path.join(dirname, constants.STATIC_FOLDER)))
}


module.exports = config
require("dotenv").config()
const path = require("path")
const session = require("express-session")
const nunjucks = require("nunjucks")
const logger = require('morgan')
const filters = require('./filter/filters')
const fileupload = require("express-fileupload")
const MongoStore = require('connect-mongo')


const configuration = (app, express, constants, dirname) => {
	//VIEWS ENGINE| NUNJUCKS
	const env = nunjucks.configure(path.resolve(dirname, constants.VIEW_FOLDER), {
		express: app,
		autoscape: true,
		noCache: false,
		watch: true
	})
	filters(env)

	//LOGGING 
	app.use(logger('dev', {}))

	//BODY PARSING
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	//SESSIONS
	app.use(session({
		secret: constants.SESSION_SECRET,
		saveUninitialized: true,
		resave: true,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, dbName: process.env.DB_NAME })
	}))

	//STATIC FILES
	app.use(express.static(path.join(dirname, constants.STATIC_FOLDER)))

	//FILEUPLOAD
	app.use(fileupload({
		limits: {
			fileSize: 1000000 //1mb
		},
		abortOnLimit: true
	}))
}


module.exports = configuration
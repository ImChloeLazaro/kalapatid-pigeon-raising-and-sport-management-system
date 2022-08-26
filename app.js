
require("dotenv").config()
const path = require("path")
const express = require("express");
const session = require("express-session")
const nunjucks = require("nunjucks")
const logger = require('morgan')

const constants = require('./constants/constants')




const authentication = require("./authentication")
const club = require("./club-management/index.js")
const events = require("./event-management/index.js")
const chat = require("./chat/index.js")
const messaging = require("./messaging/index.js")
const notification = require("./notification/index.js")
const post = require("./posting/index.js")
const profile = require("./profile/index.js")
const root = require("./root/index.js")


const app = express()
nunjucks.configure(path.resolve(__dirname, 'views'), {
	express: app,
	autoscape: true,
	noCache: false,
	watch: true
})

app.use(logger('dev', {}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
	secret: "secret of the star",
	saveUninitialized: false,
	resave: false
}))
app.use(express.static(path.join(__dirname, 'public')))






let main = express.Router()

// mainRouter.use("/search", otherRouter.SEARCH)
main.use('/auth', authentication)
main.use('/chats', chat)
main.use('/clubs', club)
main.use('/events', events)
main.use('/messages', messaging)
main.use('/notifications', notification)
main.use('/posts', post)
main.use('/profile', profile)
main.use('/', root)
main.use('/**', root)


app.use(constants.ctx.DOMAIN_NAME, main)
app.use('/', (req, res) => res.redirect(constants.ctx.DOMAIN_NAME))



app.listen(process.env.PORT, (err) => {
	if (err) console.error(err)
	console.log(`Web Server: Running on Port ${process.env.PORT}...`)
});

const authentication = require("../authentication")
const club = require("../club-management/index.js")
const events = require("../event-management/index.js")
const chat = require("../chat/index.js")
const messaging = require("../messaging/index.js")
const notification = require("../notification/index.js")
const post = require("../posting/index.js")
const profile = require("../profile/index.js")
const root = require("../root/index.js")


const config = (app, express, constants) => {
	let main = express.Router()
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
}


module.exports = config
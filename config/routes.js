
const authentication = require("../modules/authentication")
const club = require("../modules/clubs")
const events = require("../modules/events")
const chat = require("../modules/chat")
const messaging = require("../modules/messaging")
const notification = require("../modules/notification")
const post = require("../modules/posting")
const profile = require("../modules/profile")
const dashboard = require("../modules/dashboard")
const search = require("../modules/search")
const root = require("../modules/root")

console.log(dashboard)
const config = (app, express, constants) => {
	let main = express.Router()
	main.use('/auth', authentication)
	main.use('/chats', chat)
	main.use('/clubs', club)
	main.use('/events', events)
	main.use('/messages', messaging)
	main.use('/notifications', notification)
	main.use('/posts', post)
	main.use('/dashboard', dashboard)
	main.use('/profile', profile)
	main.use('/search', search)
	main.use('/', root)
	main.use('/**', root)



	app.use(constants.ctx.DOMAIN_NAME, main)
	app.use('/', (req, res) => res.redirect(constants.ctx.DOMAIN_NAME))
}


module.exports = config
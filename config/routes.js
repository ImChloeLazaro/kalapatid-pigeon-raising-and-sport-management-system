const config = (app, express, constants) => {
	let main = express.Router()
	main.use('/auth', require("../modules/authentication"))
	main.use('/chats', require("../modules/chat"))
	main.use('/clubs', require("../modules/clubs"))
	main.use('/events', require("../modules/events"))
	main.use('/messages', require("../modules/messaging"))
	main.use('/notifications', require("../modules/notification"))
	main.use('/feeds', require("../modules/posting"))
	main.use('/dashboard', require("../modules/dashboard"))
	main.use('/profile', require("../modules/profile"))
	main.use('/search', require("../modules/search"))
	main.use('/', require("../modules/root"))
	main.use('/**', require("../modules/root"))



	app.use(constants.ctx.DOMAIN_NAME, main)
	app.use('/', (req, res) => res.redirect(constants.ctx.DOMAIN_NAME))
}


module.exports = config
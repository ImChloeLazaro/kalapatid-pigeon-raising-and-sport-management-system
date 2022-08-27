require("dotenv").config()

function config(app) {
	app.listen(process.env.PORT, (err) => {
		if (err) console.error(err)
		console.log(`Web Server: Running on Port ${process.env.PORT}...`)
	});
}

module.exports = config

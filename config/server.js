require("dotenv").config()

function config(server) {
	server.listen((process.env.PORT), process.env.ADDR, () => {
		console.log(`Server is running on PORT: ${process.env.PORT}`.bgGreen.bold);
	});
}

module.exports = config

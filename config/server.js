require("dotenv").config()

function config(server) {
	server.listen((process.env.PORT), "0.0.0.0", () => {
		console.log(`Server is running on PORT: ${process.env.PORT}`);
	});
}

module.exports = config

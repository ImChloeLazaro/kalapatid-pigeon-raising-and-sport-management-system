const config = (app, express, server, io, constants, dirname) => {
	require('./dependencies')(app, express, constants, dirname)
	require('./routes')(app, express, constants)
	require("./realtime")(io)
	require('./server')(server)
}

module.exports = config
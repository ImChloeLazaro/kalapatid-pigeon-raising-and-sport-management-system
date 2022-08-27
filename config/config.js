const config = (app, express, constants, dirname) => {
	require('./dependencies')(app, express, constants, dirname)
	require('./routes')(app, express, constants)
	require('./server')(app)
}

module.exports = config
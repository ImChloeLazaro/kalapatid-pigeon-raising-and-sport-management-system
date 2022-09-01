
function realtime(io) {
	let clients = []
	const server = io.sockets.on('connection', function (socket) {
		let ip = socket.request.connection.remoteAddress

		socket.on('isConnected', function (data) {
			console.log("HOTRELOAD => " + ip + " isConnected: ", data)
			clients.push(ip)
			console.log("HOTRELOAD => connected ip: ", [...new Set(clients)])
		})
		socket.on('load', function () {
			console.log("HOTRELOAD => " + ip + ' request reload..')
			console.log("HOTRELOAD => sending refresh page from server to all client.")
			socket.broadcast.emit('refresh')
			console.log("HOTRELOAD => sending refresh page from server to client: " + ip)
			socket.emit('refresh')
		});
	})
}


module.exports = realtime
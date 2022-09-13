
function realtime(io) {
	let clients = []
	let onlineUsers = []
	io.sockets.on('connection', function (socket) {
		let ip = socket.request.connection.remoteAddress

		socket.on('isConnected', function (data) {
			console.log("HOTRELOAD => " + ip + " isConnected: ", data.isConnected)
			console.log("HOTRELOAD => username: ", data.username)
			clients.push(ip)
			console.log("data: ", data);
			if (data.username != null || data.username != undefined || data.username !== "") {
				console.log("from client: ", data.username)
				onlineUsers.push(data.username)
			}


			//log clients and online users.
			console.log("HOTRELOAD => connected ip: ", [...new Set(clients)])
			console.log("HOTRELOAD => connected users: ", [...new Set(onlineUsers)])

			//send to socket clients all onlineUsers Data
			socket.broadcast.emit('onlineUsers', { onlineUsers: [...new Set(onlineUsers)] })
			socket.emit('onlineUsers', { onlineUsers: [...new Set(onlineUsers)] })
		})


		socket.on('load', function (data) {
			console.log("HOTRELOAD => " + ip + ' request reload..')
			console.log("HOTRELOAD => sending refresh page from server to client: " + ip)
			socket.emit('refresh', data)
			console.log("HOTRELOAD => sending refresh page from server to all client.")
			socket.broadcast.emit('refresh', data)
		});


		socket.on('logout', function (data) {
			//empty online Users lists.
			onlineUsers = []
			console.log("HOTRELOAD => " + ip + ' request logout..')
			console.log("HOTRELOAD => sending refresh page from server to client: " + ip)
			socket.emit('refresh', data)
			console.log("HOTRELOAD => sending refresh page from server to all client.")
			socket.broadcast.emit('refresh', data)
		});
	})
}


module.exports = realtime
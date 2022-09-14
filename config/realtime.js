
function realtime(io) {
	let clients = []
	let onlineUsers = []
	io.sockets.on('connection', function (socket) {
		let ip = socket.request.connection.remoteAddress
		socket.on('isConnected', function (data) {
			console.log("Realtime: Socket Client Info".bgBlue.bold)
			console.log("Connection: ".magenta)

			console.log("HOTRELOAD => IP Address: ", `${ip}`.green)
			console.log("HOTRELOAD => connected: ", `${data.isConnected}`.green)
			console.log("HOTRELOAD => username: ", `${data.username}`.green)
			clients.push(ip)
			console.log("HOTRELOAD => data: ", data);
			if (data.username != null || data.username != undefined || data.username !== "") {
				console.log("from client: ", `${data.username}`.green)
				onlineUsers.push(data.username)
			}

			console.log("HOTRELOAD => clients and online users...".yellow)
			console.log("HOTRELOAD => connected IPs: ", `${[...new Set(clients)]}`.green)
			console.log("HOTRELOAD => connected Users: ", `${[...new Set(onlineUsers)]}`.green)
			console.log("HOTRELOAD => send to socket clients all onlineUsers Data..".yellow)

			socket.broadcast.emit('onlineUsers', { onlineUsers: [...new Set(onlineUsers)] })
			socket.emit('onlineUsers', { onlineUsers: [...new Set(onlineUsers)] })
			console.log("End".bgBlue.bold)
			console.log("\n")
		})


		socket.on('load', function (data) {
			console.log("Realtime: Socket Client Info".bgBlue.bold)
			console.log("Request Reload".magenta)
			console.log("HOTRELOAD => " + ip + ' request reload..')
			console.log("HOTRELOAD => sending refresh page from server to client: " + ` ip: ${ip}`.green)
			socket.emit('refresh', data)
			console.log("HOTRELOAD => sending refresh page from server to all client.")
			socket.broadcast.emit('refresh', data)
			console.log("End ".bgBlue.bold)
			console.log("\n")
		});


		socket.on('logout', function (data) {
			//empty online Users lists.
			onlineUsers = []
			console.log("Socket Client Info ".bgBlue.bold)
			console.log("Request Logout".magenta)
			console.log("HOTRELOAD => " + `ip`.green + ' request logout..')
			console.log("HOTRELOAD => sending refresh page from server to client: " + ` ip: ${ip}`.green)
			socket.emit('refresh', data)
			console.log("HOTRELOAD => sending refresh page from server to all client.")
			socket.broadcast.emit('refresh', data)
			console.log("End".bgBlue.bold)
			console.log("\n")
		});
	})
}


module.exports = realtime
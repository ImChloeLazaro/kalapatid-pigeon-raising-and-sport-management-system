$(function () {

	function hotReload(delay, pathname) {
		console.log("refresh page...")
		console.log('is pathname match?: ', pathname === window.location.pathname);
		if (pathname === window.location.pathname) {
			window.localStorage.isLoaded = true
			if (window.localStorage.isLoaded) {
				setTimeout(function () {
					window.location.href = window.location.href
					window.location.reload(true);
				}, delay * 1000);
				window.localStorage.isLoaded = false
			}
			console.log("refresh page done.")
		}
	}



	var socket = io();
	socket.on('connect', function () {
		console.log('HOTRELOAD => connected to server.');
		let username = $("#info-content").data("username")
		socket.emit("isConnected", { isConnected: true, username: username })
	})

	socket.on('refresh', function (data) {
		console.log(data)
		console.log("HOTRELOAD => hot reloading page...")
		hotReload(1, data.pathname)
	});



	socket.on("onlineUsers", function (data) {
		let onlineUsers = $("#online-user-container")
		console.log(data.onlineUsers)
		// filter unique data
		let onlineUsersList = [...new Set(data.onlineUsers)]

		// set numbers of online users
		$("#online-user-label").text(onlineUsersList.length)

		//render text
		function template(username) {
			return `<tr>
			<th scope="row">
				<img src="https://nikonrumors.com/wp-content/uploads/2014/03/Nikon-1-V3-sample-photo.jpg" 
				class="card-img" alt="Responsive image" style="height: 40px; width: 40px; border-radius: 50%"/>
			</th>
			<td>
				<a class="text-dark text-decoration-none" 
				href="{{ctx.DOMAIN_NAME}}/profile?username=${username}">${username}</a>
			</td>
			<td>
				<div class="badge bg-success">active</div>
			</td>
		</tr>`
		}
		innerHTMLtext = ""
		//render all online users
		onlineUsersList.forEach(username => {
			innerHTMLtext += template(username)
		})
		onlineUsers.html(innerHTMLtext)
	})


	setRealtimeComponentEvents(socket)
});

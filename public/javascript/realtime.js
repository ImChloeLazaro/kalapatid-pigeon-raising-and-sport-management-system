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
			<td>
			<a class="text-dark text-decoration-none mx-2" 
			href="${window.location.origin}/${window.location.pathname.split("/")[1]}/profile?username=${username}">
				<img src="/images/profile.jpg" id="account-picture"
				class="card-img" alt="Responsive image" style="height: 40px; width: 40px; border-radius: 50%"/>
				</a>
				<a class="text-dark text-decoration-none fw-bolder" 
				href="${window.location.origin}/${window.location.pathname.split("/")[1]}/profile?username=${username}">@${username}</a>
			</td>
			<td>
			<td style="color: #2DA380; font-size: 10px; position: relative; top: 8px;"><i class="fa-solid fa-circle"></i></td>
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

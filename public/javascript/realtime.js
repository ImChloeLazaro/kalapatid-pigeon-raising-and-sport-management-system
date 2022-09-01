

$(function () {
	function hotReload(delay) {
		console.log("refresh page...")
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

	var socket = io();
	socket.on('connect', function () {
		console.log('HOTRELOAD => connected to server.');
		socket.emit("isConnected", true)
	})

	socket.on('refresh', function () {
		console.log("HOTRELOAD => hot reloading page...")
		hotReload(1)
	});


	// Chatting
	$('#chat-form-btn').on("click", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})

	// Messaging

	$('#msg-form-btn').on("click", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})


	$('#msg-rm-form-btn').on("click", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})

	$('#msg-container').on("change", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})

	// posting a message
	$('#post-submit-btn').on("click", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})

	$('#post-comment-btn').on("click", () => {
		console.log("HOTRELOAD => request reload..")
		socket.emit('load')
	})

});

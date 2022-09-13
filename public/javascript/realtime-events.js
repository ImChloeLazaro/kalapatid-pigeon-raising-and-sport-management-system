function setRealtimeComponentEvents(socket) {
	//set load emitter
	const loadEmitter = () => {
		console.log("HOTRELOAD => request reload..")
		let pathname = window.location.pathname
		socket.emit('load', { name: "reload chats..", pathname: pathname })
	}
	//set logout emitter
	const logoutEmitter = () => {
		console.log("HOTRELOAD => request logout..")
		let pathname = window.location.pathname
		socket.emit('logout', { name: "logout.", pathname: pathname })
	}

	//set realtime events
	// Chatting
	$('#chat-form-btn').on("click", loadEmitter)
	// Messaging
	$('#msg-form-btn').on("click", loadEmitter)
	// message remove
	$('#msg-rm-form-btn').on("click", loadEmitter)
	//	message list change
	$('#msg-container').on("change", loadEmitter)
	// posting submit
	$('#post-submit-btn').on("click", loadEmitter)
	// post delete
	$('#post-del-btn').on("click", loadEmitter)
	// comment delete
	$('#comment-del-btn').on("click", loadEmitter)
	// comment submit
	$('#post-comment-btn').on("click", loadEmitter)
	// logout 
	$('#logout-btn').on("click", logoutEmitter)

}
function Message(id, messageId, username1, username2, msg) {
	return {
		_id: id,
		messageId: messageId,
		username1: username1,
		username2: username2,
		msg: msg
	}
}


module.exports.Message = Message
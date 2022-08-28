function Message(id, messageId, datetime, username1, username2, msg) {
	return {
		_id: id,
		messageId: messageId,
		datetime: datetime,
		username1: username1,
		username2: username2,
		msg: msg
	}
}


module.exports.Message = Message
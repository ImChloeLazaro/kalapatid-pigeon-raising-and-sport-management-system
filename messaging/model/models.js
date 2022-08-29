const ObjectId = require("mongodb").ObjectId

function Message(messageId, accountId, datetime, username1, username2, msg) {
	return {
		_id: new ObjectId(),
		messageId: new ObjectId(messageId),
		accountId: new ObjectId(accountId),
		datetime: datetime,
		username1: username1,
		username2: username2,
		msg: msg
	}
}


module.exports.Message = Message
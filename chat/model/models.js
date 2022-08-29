const ObjectId = require("mongodb").ObjectId

function Chat(accountId, username, chat) {
	return {
		_id: new ObjectId(),
		accountId: ObjectId(accountId),
		username: username,
		chat: chat
	}
}

module.exports.Chat = Chat
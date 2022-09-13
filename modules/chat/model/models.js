const ObjectId = require("mongodb").ObjectId


function Chat(accountId, clubId, clubName, datetime, username, chat) {
	console.log(accountId, clubId, clubName, datetime, username, chat)
	return {
		_id: new ObjectId(),
		clubId: new ObjectId(clubId),
		accountId: new ObjectId(accountId),
		clubName: clubName,
		datetime: datetime,
		username: username,
		chat: chat
	}
}

module.exports.Chat = Chat
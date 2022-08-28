function Chat(id, accountId, username, chat) {
	return {
		_id: id,
		accountId: accountId,
		username: username,
		chat: chat
	}
}

module.exports.Chat = Chat
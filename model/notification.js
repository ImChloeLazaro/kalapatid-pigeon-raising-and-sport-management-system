const ObjectId = require('mongodb').ObjectId

module.exports = function Notification(accountId, username, notificationPreveledge, data, datetime) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		username: username,
		notificationPreveledge: notificationPreveledge,
		data: data,
		datetime: datetime,
	}
}
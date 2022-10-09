const ObjectId = require('mongodb').ObjectId

module.exports.Notification = function Notification(data) {
	return {
		_id: new ObjectId(),
		data: data
	}
}
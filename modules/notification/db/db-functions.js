const db = require('../../../database/datatabase')

module.exports.insertNotificationDataBy = function insertNotificationDataBy(data, fn) {
	db.getCollection("notifications", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}



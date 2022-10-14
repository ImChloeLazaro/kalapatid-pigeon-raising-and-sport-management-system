const db = require('./datatabase')

function getNotificationDataBy(filter, fn) {
	db.getCollection("notifications", (col) => {
		col.find(filter).sort({ datetime: 1 }).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}

function insertNotificationData(data, fn) {
	db.getCollection("notifications", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}




module.exports.insertNotification = function insertNotification(data) {
	insertNotificationData(data, (err) => {
		if (err) {
			console.log(err)
		} else {
			console.log("Notification inserted")
		}
	})
}


module.exports.getNotifications = function getNotifications(filter, fn) {
	getNotificationDataBy(filter, (err, docs) => {
		if (err) console.log(err);
		let notifications = docs;
		fn(err, notifications)
	})
}

module.exports.getAllNotifications = function getAllNotifications(filter, fn) {
	db.getCollection("notifications", (col) => {
		col.find(filter).sort({ datetime: 1 }).toArray((err, docs) => {
			if (err) console.log(err);
			let notifications = docs;
			fn(err, notifications)
		})
	})
}

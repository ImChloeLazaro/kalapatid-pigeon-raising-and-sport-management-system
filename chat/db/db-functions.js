const db = require('./db')



function insertChatData(data, fn) {
	db.getCollection("chats", (col) => {

		// col.createIndex({ "email": 1 }, { unique: true })
		// col.createIndex({ "username": 1 }, { unique: true })

		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllChatData(filter, fn) {
	db.getCollection("chats", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


module.exports.getAllChatData = getAllChatData
module.exports.insertChatData = insertChatData



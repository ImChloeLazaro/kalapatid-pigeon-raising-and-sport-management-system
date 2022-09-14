const db = require('../../../database/datatabase')

function insertChatData(data, fn) {
	db.getCollection("chats", (col) => {
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



const db = require('./db')


function insertMessageData(data, fn) {
	db.getCollection("messages", (col) => {

		// col.createIndex({ "email": 1 }, { unique: true })
		// col.createIndex({ "username": 1 }, { unique: true })

		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllMessageData(fn) {
	db.getCollection("messages", (col) => {
		col.find().toArray((err, docs) => {
			if (err) console.log(err);


			fn(err, docs)
		})
	})
}


// function insertMessageData(data, fn) {
// 	db.getCollection("messages", (col) => {

// 		// col.createIndex({ "email": 1 }, { unique: true })
// 		// col.createIndex({ "username": 1 }, { unique: true })

// 		col.insertOne(data, (err) => {
// 			if (err) console.log(err);
// 			fn(err)
// 		})
// 	})

// }




function getMessageDataById(messageId, fn) {
	db.getCollection("messages", (col) => {
		col.find({ messageId: messageId }).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


module.exports.getAllMessageData = getAllMessageData
module.exports.insertMessageData = insertMessageData
module.exports.getMessageDataById = getMessageDataById


const db = require('./db')


function insertMessageData(data, fn) {
	db.getCollection("messages", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllMessageData(filter, fn) {
	db.getCollection("messages", (col) => {
		col.find(filter).sort({ datetime: -1 }).toArray((err, docs) => {
			if (err) console.log(err);

			fn(err, docs)
		})
	})
}

function getMessageDataById(filter, fn) {
	db.getCollection("messages", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function deleteDataById(filter, fn) {
	db.getCollection("messages", (col) => {
		col.remove(filter, (err) => {
			if (err) console.log(err)
			fn(err)
		})
	})
}


module.exports.getAllMessageData = getAllMessageData
module.exports.insertMessageData = insertMessageData
module.exports.getMessageDataById = getMessageDataById
module.exports.deleteDataById = deleteDataById


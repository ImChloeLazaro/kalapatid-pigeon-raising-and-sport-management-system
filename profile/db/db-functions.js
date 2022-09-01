const db = require('./db')



function getMessageDataBy(filter, fn) {
	db.getCollection("messages", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function getAllMessageDataBy(filter, fn) {
	db.getCollection("messages", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


module.exports = {
	getMessageDataBy: getMessageDataBy,
	getAllMessageDataBy: getAllMessageDataBy
}
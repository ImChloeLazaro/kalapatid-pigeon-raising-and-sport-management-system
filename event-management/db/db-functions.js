const db = require('./db')



function insertEventData(data, fn) {
	db.getCollection("events", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllEventDataBy(filter, fn) {
	db.getCollection("events", (col) => {
		col.find(filter).toArray((err, docs) => {
			console.log(docs)
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}



module.exports = {
	getAllEventDataBy: getAllEventDataBy,
	insertEventData: insertEventData,
}
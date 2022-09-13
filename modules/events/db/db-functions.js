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

			if (err) console.log(err)
			fn(err, docs)
		})
	})
}



function getEventDataBy(filter, fn) {
	db.getCollection("events", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}


function insertManyEventParticipantData(array, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.insertMany(array, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}


function getEventAllParticipantDataBy(filter, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}

function getAllAcountData(fn) {
	db.getCollection("accounts", (col) => {
		col.find().toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}



module.exports = {
	getAllAcountData: getAllAcountData,
	getEventDataBy: getEventDataBy,
	getAllEventDataBy: getAllEventDataBy,
	insertEventData: insertEventData,
	insertManyEventParticipantData: insertManyEventParticipantData,
	getEventAllParticipantDataBy: getEventAllParticipantDataBy
}
const db = require('../../../database/datatabase')


function insertEventDataBy(data, fn) {
	db.getCollection("events", (col) => {
		col.createIndex({ "name": 1, "accountId": 1 }, { unique: true })
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}
function updateEventDataBy(filter, setUpdate, fn) {
	db.getCollection("events", (col) => {
		col.updateOne(filter, setUpdate, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}


function deleteEventDataBy(filter, fn) {
	db.getCollection("events", (col) => {
		col.deleteOne(filter, (err) => {
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



function insertEventParticipantData(data, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.createIndex({ "eventId": 1 }, { unique: true })
		col.insertOne(data, (err) => {
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


function getEventParticipantDataBy(filter, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}
function updateEventParticipantDataBy(filter, setData, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.updateOne(filter, { $set: setData }, (err) => {
			fn(err)
		})
	})
}
function deleteEventParticipantDataBy(filter, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.deleteOne(filter, (err) => {
			fn(err)
		})
	})
}

function deleteAllEventParticipantDataBy(filter, fn) {
	db.getCollection("eventParticipants", (col) => {
		col.deleteMany(filter, (err) => {
			fn(err)
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
	insertEventDataBy: insertEventDataBy,
	updateEventDataBy: updateEventDataBy,
	insertManyEventParticipantData: insertManyEventParticipantData,
	getEventAllParticipantDataBy: getEventAllParticipantDataBy,

	insertEventParticipantData: insertEventParticipantData,
	getEventParticipantDataBy: getEventParticipantDataBy,
	updateEventParticipantDataBy: updateEventParticipantDataBy,
	deleteEventParticipantDataBy: deleteEventParticipantDataBy,
	deleteEventDataBy: deleteEventDataBy,
	deleteAllEventParticipantDataBy: deleteAllEventParticipantDataBy
}
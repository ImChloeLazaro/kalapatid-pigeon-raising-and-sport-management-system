const db = require('../../../database/datatabase')


function getAccountDataBy(filter, fn) {
	db.getCollection("accounts", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}

function getAddressDataBy(filter, fn) {
	db.getCollection("addresses", (col) => {
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


function getProfileDataBy(filter, fn) {
	db.getCollection("profiles", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}
function insertProfileData(data, fn) {
	db.getCollection("profiles", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}
function updateProfileData(filter, setUpdate, fn) {
	db.getCollection("profiles", (col) => {
		col.updateOne(filter, { $set: setUpdate }, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}

function getAllProfileDataBy(filter, fn) {
	db.getCollection("profiles", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}





module.exports = {
	getAccountDataBy: getAccountDataBy,
	getAddressDataBy: getAddressDataBy,
	getAllMessageDataBy: getAllMessageDataBy,
	getProfileDataBy: getProfileDataBy,
	insertProfileData: insertProfileData,
	updateProfileData: updateProfileData,
	getAllProfileDataBy: getAllProfileDataBy
}
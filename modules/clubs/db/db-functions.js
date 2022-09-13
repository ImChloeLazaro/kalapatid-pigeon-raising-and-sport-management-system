const db = require('./db')

function insertClubData(data, fn) {
	db.getCollection("clubs", (col) => {
		col.createIndex({ "name": 1 }, { unique: true })
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllClubDataBy(filter, fn) {
	db.getCollection("clubs", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}



function getClubDataBy(filter, fn) {
	db.getCollection("clubs", (col) => {
		col.findOne(filter, (err, docs) => {
			if (err) console.log(err)
			fn(err, docs)
		})
	})
}

function getClubAllMemberDataBy(filter, fn) {
	db.getCollection("clubMembers", (col) => {
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




function insertClubMemberData(data, fn) {
	db.getCollection("clubMembers", (col) => {
		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}




function insertManyClubMemberData(array, fn) {
	db.getCollection("clubMembers", (col) => {
		col.insertMany(array, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}

module.exports = {
	getAllClubDataBy: getAllClubDataBy,
	getClubDataBy: getClubDataBy,
	getClubAllMemberDataBy: getClubAllMemberDataBy,
	insertClubData: insertClubData,
	insertClubMemberData: insertClubMemberData,
	getAllAcountData: getAllAcountData,
	insertManyClubMemberData: insertManyClubMemberData
}
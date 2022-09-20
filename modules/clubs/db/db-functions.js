const db = require('../../../database/datatabase')

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




function updateClubMemberData(filter, setUpdate, fn) {
	db.getCollection("clubMembers", (col) => {
		col.findOne(filter, (err, docs) => {
			console.log(docs);
		})
		col.updateOne(filter, { $set: setUpdate }, (err) => {
			console.log("updateClubMembers Data.");
			fn(err)
		})
	})
}




function deleteClubMemberData(filter, fn) {
	db.getCollection("clubMembers", (col) => {
		col.findOne(filter, (err, docs) => {
			console.log(docs);
		})
		col.deleteOne(filter, (err) => {
			console.log("deleteClubMember Data.");
			fn(err)
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

module.exports = {
	getAllClubDataBy: getAllClubDataBy,
	getClubDataBy: getClubDataBy,
	getClubAllMemberDataBy: getClubAllMemberDataBy,
	insertClubData: insertClubData,
	insertClubMemberData: insertClubMemberData,
	getAllAcountData: getAllAcountData,
	insertClubMemberData: insertClubMemberData,
	updateClubMemberData: updateClubMemberData,
	deleteClubMemberData: deleteClubMemberData
}
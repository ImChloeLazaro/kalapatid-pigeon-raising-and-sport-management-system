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
			console.log(docs)
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

function getAllAcountData(fn) {
	db.getCollection("accounts", (col) => {
		col.find().toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function updateClubMemberDataBy(filter, members, fn) {
	db.getCollection("clubs", (col) => {
		col.findOne(filter, (err, docs) => {
			let set = { $set: { members: [...docs.members, ...members] } }
			console.log([new Set([...docs.members, ...members])]);
			col.updateOne(filter, set, function (err) {
				if (err) {
					fn(err)
					return
				}
			})
			fn(err, docs)
		})
	})
}

module.exports = {
	getAllClubDataBy: getAllClubDataBy,
	getClubDataBy: getClubDataBy,
	insertClubData: insertClubData,
	getAllAcountData: getAllAcountData,
	updateClubMemberDataBy: updateClubMemberDataBy
}
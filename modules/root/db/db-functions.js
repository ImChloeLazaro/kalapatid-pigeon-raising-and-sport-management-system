const db = require('./db')


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







module.exports = {
	getAccountDataBy: getAccountDataBy,
	getAddressDataBy: getAddressDataBy
}
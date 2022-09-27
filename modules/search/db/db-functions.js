const db = require('../../../database/datatabase')


function getAccountDataBy(filter, fn) {
	db.getCollection("accounts", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}




module.exports = {
	getAccountDataBy: getAccountDataBy,
}
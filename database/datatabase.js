
require('dotenv').config()
const { MongoClient } = require('mongodb');

async function db() {
	let env = process.env
	let client = new MongoClient(env.MONGO_URL)
	try {
		await client.connect()
		let db = client.db(env.DB_NAME)
		console.log("Database Connection: ".bgYellow.bold);
		console.log('MongoDB server: Connected successfully.'.green)
		console.log("\n");
		return db;
	} catch (e) {
		console.error('MongoDB server: Connected unsuccessfully.'.red, e);
	}
}


function getCollection(name, fn) {
	db().then(c => {
		try {
			fn(c.collection(name))
		} catch (err) {
			console.log(err)
		}
	}).catch(err => {
		console.log(err)
	})
}



module.exports.getCollection = getCollection

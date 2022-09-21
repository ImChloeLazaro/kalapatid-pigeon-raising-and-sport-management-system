
require('dotenv').config()
const { MongoClient } = require('mongodb');

async function db() {
	let client;
	try {
		let env = process.env
		const client = new MongoClient(env.MONGO_URL)
		await client.connect()

		let db = client.db(env.DB_NAME)
		console.log("Database Connection: ".bgYellow.bold);
		console.log('MongoDB server: Connected successfully.'.green)
		console.log("\n");
		return db
	} catch (error) {
		console.error('MongoDB server: Connected unsuccessfully.'.red, error);
		console.log("\n");
		process.exit();
	}
}


function getCollection(name, fn) {
	db().then(c => {
		fn(c.collection(name))
	}).catch(err => {
		console.log(err)
	})
}



module.exports.getCollection = getCollection

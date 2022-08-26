//NOTE: This source file contains the database configuration of the system
//where the database is configured.
//for local tunnel database server hosting we use ngrok:
//command: ngrok tcp 27017
//result without tcp:// to access the database server

require('dotenv').config()
const { MongoClient } = require('mongodb');

async function db() {
  let client;
  try {
    let env = process.env
    const client = new MongoClient(`mongodb://${env.DB_ADDR}:${env.DB_PORT}`)
    await client.connect()

    let db = client.db(env.DB_NAME)
    console.log('MongoDB server: Connected successfully.')
    return db
  } catch (error) {
    console.error('MongoDB server: Connected unsuccessfully.', error);
    process.exit();
  }
}


console.log(db())



function getCollection(name, fn) {
  db().then(c => {
    fn(c.collection(name))
  }).catch(err => {
    console.log(err)
  })
}





module.exports = {
  getCollection: getCollection
};
db = connect('mongodb://localhost:27017/tryall');

// list collections
function listCollections() {
	for (var col of db.getCollectionNames()) {
		print(col)
	}
}
// drop all collections
function dropCollections() {
	for (var col of db.getCollectionNames()) {
		printjson("dropping collection: ", col)
		db.getCollection(col).drop()
	}
}




function getData(colName) {
	printjson(db.getCollection(colName).find())
}


listCollections()
// dropCollections()
// // printjson(db.getCollection("accounts").find())
// print(db.getCollection("events").drop())
// print(db.getCollection("clubMembers").drop())
// print(db.getCollection("clubs").drop())
// print(db.getCollection("eventParticipants").drop())

printjson(db.getCollection("eventParticipants").find())
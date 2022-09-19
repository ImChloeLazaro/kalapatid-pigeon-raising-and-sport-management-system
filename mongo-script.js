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

function dropCollectionsExcept(name) {
	for (var col of db.getCollectionNames()) {
		if (col != name) {
			db.getCollection(col).drop()
		}
	}
}



function getData(colName) {
	printjson(db.getCollection(colName).find())
}


listCollections()
// printjson(db.getCollection("accounts").find())
printjson(db.getCollection("eventParticipants").find())
// print(db.getCollection("eventParticipants").drop())
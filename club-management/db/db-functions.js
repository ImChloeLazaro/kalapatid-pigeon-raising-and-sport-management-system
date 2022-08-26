const db = require('./db')



function insertPostData(data, fn) {
	db.getCollection("posts", (col) => {

		// col.createIndex({ "email": 1 }, { unique: true })
		// col.createIndex({ "username": 1 }, { unique: true })

		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getAllPostData(fn) {
	db.getCollection("posts", (col) => {
		col.find().toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}




function insertCommentData(data, fn) {
	db.getCollection("comments", (col) => {

		col.insertOne(data, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})

}



function getCommentDataById(postId, fn) {
	db.getCollection("comments", (col) => {
		col.find({ postId: postId }).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function getAllCommentData(fn) {
	db.getCollection("comments", (col) => {
		col.find({}).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}



module.exports = {
	getAllPostData: getAllPostData,
	insertPostData: insertPostData,
	insertCommentData: insertCommentData,
	getCommentDataById: getCommentDataById,
	getAllCommentData: getAllCommentData
}
const db = require('../../../database/datatabase')



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



function getAllPostData(filter, fn) {
	db.getCollection("posts", (col) => {
		col.find(filter).toArray((err, docs) => {
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



function getCommentDataById(filter, fn) {
	db.getCollection("comments", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function getAllCommentData(filter, fn) {
	db.getCollection("comments", (col) => {
		col.find(filter).toArray((err, docs) => {
			if (err) console.log(err);
			fn(err, docs)
		})
	})
}


function deletePostData(filter, fn) {
	db.getCollection("posts", (col) => {
		col.deleteOne(filter, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}


function deleteCommentData(filter, fn) {
	db.getCollection("comments", (col) => {
		col.deleteOne(filter, (err) => {
			if (err) console.log(err);
			fn(err)
		})
	})
}



module.exports = {
	getAllPostData: getAllPostData,
	insertPostData: insertPostData,
	insertCommentData: insertCommentData,
	getCommentDataById: getCommentDataById,
	getAllCommentData: getAllCommentData,
	deletePostData: deletePostData,
	deleteCommentData: deleteCommentData
}
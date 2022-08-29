const ObjectId = require('mongodb').ObjectId

function Post(accountId, datetime, post) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		datetime: datetime,
		post: post
	}
}

function Comment(accountId, postId, datetime, comment) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		postId: new ObjectId(postId),
		datetime: datetime,
		comment: comment
	}
}


module.exports.Post = Post
module.exports.Comment = Comment
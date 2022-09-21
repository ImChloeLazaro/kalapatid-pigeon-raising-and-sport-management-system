const ObjectId = require('mongodb').ObjectId



function Post(accountId, username, datetime, post) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		username: username,
		datetime: datetime,
		post: post
	}
}





function Comment(accountId, postId, username, datetime, comment) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		postId: new ObjectId(postId),
		username: username,
		datetime: datetime,
		comment: comment
	}
}


module.exports.Post = Post
module.exports.Comment = Comment
function Post(id, datetime, post) {
	return {
		_id: id,
		datetime: datetime,
		post: post
	}
}

function Comment(id, postId, datetime, comment) {
	return {
		_id: id,
		postId: postId,
		datetime: datetime,
		comment: comment
	}
}


module.exports.Post = Post
module.exports.Comment = Comment
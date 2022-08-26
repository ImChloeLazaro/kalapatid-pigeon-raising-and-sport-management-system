function Post(id, post) {
	return {
		_id: id,
		post: post
	}
}

function Comment(id, postId, comment) {
	return {
		_id: id,
		postId: postId,
		comment: comment
	}
}


module.exports.Post = Post
module.exports.Comment = Comment
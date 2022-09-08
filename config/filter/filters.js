

function filters(env) {
	env.addFilter('limit', function (arr, limit) {
		return arr.slice(0, limit);
	})

	env.addFilter('shorten', function (str, count) {
		return str.slice(0, count || 5);
	})

	env.addFilter('contains', function (arr, value) {
		return arr.indexOf(value) !== -1 ? true : false;
	})

	env.addFilter('is_empty', function (arr) {
		return arr.length === 0;
	})
	env.addFilter('is_empty_str', function (str) {
		return str === null
	})
	env.addFilter('unique', function (arr) {
		return [new Set(arr)]
	})
	env.addFilter('unique_msg', function (arr) {
		let data = []
		for (var d of arr) {
			let messageId = d.messageId.toString();
			let fd = data.filter(data => (data.messageId == messageId))
			if (fd.length === 0) {
				data.push({
					messageId: messageId,
					datetime: d.datetime,
					username1: d.username1,
					username2: d.username2
				})
			}

		}
		return data
	})

	env.addFilter('unique_chat', function (arr) {
		let data = []
		for (var d of arr) {
			let clubId = d.clubId.toString();
			let fd = data.filter(data => (data.clubId == clubId))
			if (fd.length === 0) {
				data.push({
					_id: d._id,
					clubId: clubId,
					datetime: d.datetime,
					username: d.username,
				})
			}

		}
		return data
	})

}



module.exports = filters
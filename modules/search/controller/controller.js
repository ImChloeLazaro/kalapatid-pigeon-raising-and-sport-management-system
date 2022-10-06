const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")


const { getAccountDataBy } = require('../db/db-functions')
const { getAllClubDataBy } = require("../../clubs/db/db-functions")
const { getAllEventDataBy } = require("../../events/db/db-functions")
const { getAllProfileDataBy } = require("../../profile/db/db-functions")

const SEARCH = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/search/result/?q=" + req.query.q)
	})

}

const SEARCH_RESULT = (req, res) => {
	function query(q, fn) {
		let filter = { username: q }
		getAccountDataBy(filter, (err, docs) => {
			let accounts = docs;
			filter = { name: q }
			getAllEventDataBy(filter, (err, docs) => {
				let events = docs;
				getAllClubDataBy(filter, (err, docs) => {
					let clubs = docs;
					getAllProfileDataBy({}, (err, docs) => {
						let profile = docs;
						fn(accounts, profile, events, clubs);
					})

				})
			})
		})
	}


	verifyLogin(req, res, (accountId, username) => {
		query(req.query.q, (accounts, profile, events, clubs) => {
			console.log(accounts);
			console.log(events);
			console.log(clubs);
			console.log(profile);
			return res.render('search/search-result.html', {
				ctx: globalConstants.ctx,
				q: req.query.q,
				accountId: accountId,
				profile: profile,
				username: username,
				accounts: accounts,
				events: events,
				clubs: clubs
			})
		})
	})

}



module.exports = {
	SEARCH: SEARCH,
	SEARCH_RESULT: SEARCH_RESULT
}
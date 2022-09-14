const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')



const GET_CLUB = (req, res) => {
	function query(fn) {
		dbf.getAllClubDataBy({}, (err, docs) => {
			if (err) return
			let clubs = docs
			fn(clubs)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query((clubs) => {
			return res.render("club/index.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				clubs: clubs
			})
		})
	})

}


const SHOW_CLUB_ID = (req, res) => {
	function query(clubId, fn) {
		dbf.getClubDataBy({ _id: new ObjectId(clubId) }, (err, docs) => {
			if (err) return
			let club = docs
			dbf.getClubAllMemberDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
				if (err) return
				let clubMembers = docs
				fn(club, clubMembers)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(req.params.id, (club, clubMembers) => {
			return res.render("club/show-club.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username, username,
				club: club,
				clubMembers: clubMembers
			})
		})
	})

}




const GET_CREATE_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("club/create-club.html", {
			ctx: globalConstants.ctx,
			username: username
		})
	})
}



const POST_CREATE_CLUB = (req, res) => {
	function query(clubModel, clubMemberModel, fn) {
		dbf.insertClubData(clubModel, (err) => {
			if (!err) {
				dbf.insertClubMemberData(clubMemberModel, (err) => {
					if (err) {
						console.log(err)
					}
				})
			}
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let name = req.body.clubName
		let date = datetimenow()
		let description = req.body.description
		let clubModel = model.Club(name, date, description, accountId)
		let clubMemberModel = model.ClubMember(clubModel._id.toString(), accountId, username, "admin")
		query(clubModel, clubMemberModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		})
	})
}



const GET_ADD_MEMBER = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.params.clubId
		dbf.getAllAcountData((err, docs) => {
			let accounts = docs
			let filter = { clubId: new ObjectId(clubId) }
			dbf.getClubAllMemberDataBy(filter, (err, docs) => {
				let clubMembers = docs
				return res.render("club/add-member.html", {
					ctx: globalConstants.ctx,
					clubId: clubId,
					username: username,
					accountId: accountId,
					accounts: accounts,
					clubMembers: clubMembers
				})
			})
		})
	})
}


const POST_ADD_MEMBER = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubmembers = []
		let clubId = req.params.clubId
		let members = req.body.members
		if (members instanceof Array) {
			members.forEach(member => {
				clubmembers.push(model.ClubMember(clubId, member["accountId"], member["username"], member["memberStatus"]))
			})
		}
		dbf.insertManyClubMemberData(clubmembers, (err) => {
			console.log(err)
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show/" + clubId)
		})
	})
}



module.exports = {
	GET_CLUB: GET_CLUB,
	SHOW_CLUB_ID: SHOW_CLUB_ID,
	GET_CREATE_CLUB: GET_CREATE_CLUB,
	POST_CREATE_CLUB: POST_CREATE_CLUB,
	GET_ADD_MEMBER: GET_ADD_MEMBER,
	POST_ADD_MEMBER: POST_ADD_MEMBER
}


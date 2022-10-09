const { ObjectId } = require("mongodb")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const { insertNotificationDataBy } = require('../../notification/db/db-functions')
const model = require('../model/model')


const globalConstants = require("../../../constants/constants");
const { getAllEventDataBy, deleteAllEventParticipantDataBy, deleteEventDataBy } = require("../../events/db/db-functions")

const GET_CLUB = (req, res) => {
	function query(fn) {
		dbf.getAllClubDataBy({}, (err, docs) => {
			if (err) return
			let clubs = docs
			dbf.getClubAllMemberDataBy({}, (err, docs) => {
				if (err) return
				let clubMembers = docs
				fn(clubs, clubMembers)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query((clubs, clubMembers) => {
			if (clubs != null && clubMembers != null) {
				return res.render("club/index.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username: username,
					clubs: clubs,
					clubMembers: clubMembers
				})
			} else {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME)
			}
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
				getAllEventDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
					if (err) return
					let events = docs
					fn(club, clubMembers, events)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(req.query.clubId, (club, clubMembers, events) => {
			if (club != null && clubMembers != null && events != null) {
				return res.render("club/show-club.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username, username,
					club: club,
					clubMembers: clubMembers,
					events: events
				})
			} else {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
			}
		})
	})

}



const GET_EDIT_CLUB_ID = (req, res) => {
	function query(clubId, fn) {
		dbf.getClubDataBy({ _id: new ObjectId(clubId) }, (err, docs) => {
			if (err) return
			let club = docs
			dbf.getClubAllMemberDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
				if (err) return
				let clubMembers = docs
				getAllEventDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
					if (err) return
					let events = docs
					console.log(events);
					fn(club, clubMembers, events)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(req.query.clubId, (club, clubMembers, events) => {
			if (club != null && clubMembers != null && events != null) {
				return res.render("club/edit-club.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username, username,
					club: club,
					clubMembers: clubMembers,
					events: events
				})
			} else {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
			}
		})
	})
}



const POST_EDIT_CLUB_ID = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateClubDataBy(filter, { $set: setUpdate }, (err) => {
			fn(err)
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let clubName = req.body.clubName;
		let description = req.body.description;
		let filter = { _id: new ObjectId(clubId) };
		let setUpdate = { name: clubName, description: description };
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}

const GET_DELETE_CLUB_ID = (req, res) => {
	function query(filter, fn) {
		dbf.deleteClubDataBy(filter, (err) => {
			deleteEventDataBy({ clubId: filter._id }, (err) => {
				deleteAllEventParticipantDataBy({ clubId: filter._id }, (err) => {
					fn(err)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let filter = { _id: new ObjectId(clubId) }
		query(filter, (err) => {
			res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		});
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
		let clubModel = model.Club(name, date, description, accountId, username)
		let clubMemberModel = model.ClubMember(clubModel._id.toString(), accountId, username, "admin", "accepted")
		query(clubModel, clubMemberModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		})
	})
}



const POST_MEMBERSHIP_REQUEST = (req, res) => {
	function query(data, fn) {
		dbf.insertClubMemberData(data, (err) => {
			fn(err)
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.body.clubId
		let clubMember = model.ClubMember(clubId, accountId.toString(), username, "user", "pending")
		query(clubMember, (docs) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}


const POST_MEMBERSHIP_HANDLE_REQUEST = (req, res) => {
	function query(filter, setUpdate, fn) {
		if (setUpdate.memberStatus === "declined") {
			console.log(filter, setUpdate, "declined");
			dbf.deleteClubMemberData(filter, (err) => {
				fn(err)
			})
		} else if (setUpdate.memberStatus === "accepted") {
			console.log(filter, setUpdate, "accepted");
			dbf.updateClubMemberData(filter, setUpdate, (err) => {
				fn(err)
			})
		}
	}
	verifyLogin(req, res, (accountId, username) => {
		let id = req.body.id;
		let accId = req.body.accId;
		let clubId = req.body.clubId
		let status = req.body.status;

		let filter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		let setUpdate = { memberStatus: status }
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}

const POST_MEMBERSHIP_UNJOIN = (req, res) => {
	function query(filter, fn) {
		dbf.removeClubMemberData(filter, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		if (req.body.username !== username) {
			username = req.body.username
		}
		console.log("username: ".red, username);
		let id = req.body.id;
		let clubId = req.body.clubId
		let filter = { username: username, clubId: new ObjectId(clubId) }
		query(filter, (err) => {
			console.log(err);
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		})
	})
}



module.exports = {
	GET_CLUB: GET_CLUB,
	SHOW_CLUB_ID: SHOW_CLUB_ID,
	GET_EDIT_CLUB_ID: GET_EDIT_CLUB_ID,
	POST_EDIT_CLUB_ID: POST_EDIT_CLUB_ID,
	GET_CREATE_CLUB: GET_CREATE_CLUB,
	POST_CREATE_CLUB: POST_CREATE_CLUB,
	GET_DELETE_CLUB_ID: GET_DELETE_CLUB_ID,
	POST_MEMBERSHIP_REQUEST: POST_MEMBERSHIP_REQUEST,
	POST_MEMBERSHIP_HANDLE_REQUEST: POST_MEMBERSHIP_HANDLE_REQUEST,
	POST_MEMBERSHIP_UNJOIN: POST_MEMBERSHIP_UNJOIN,
}


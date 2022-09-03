const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')



const GET_CLUB = (req, res) => {
	function query(fn) {
		let filter = {}
		dbf.getAllClubDataBy(filter, (err, docs) => {
			if (err) return
			let clubs = docs
			fn(clubs)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query((clubs) => {
			return res.render("club/index.html", {
				ctx: globalConstants.ctx,
				clubs: clubs
			})
		})
	})

}


const SHOW_CLUB_ID = (req, res) => {
	function query(clubId, fn) {
		let clubIdObj = new ObjectId(clubId)
		let filter = {}
		dbf.getClubDataBy(filter, (err, docs) => {
			if (err) return
			let club = docs
			fn(club)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(req.params.id, (club) => {
			console.log("club: " + club)
			return res.render("club/show-club.html", {
				ctx: globalConstants.ctx,
				club: club
			})
		})
	})

}




const GET_CREATE_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("club/create-club.html", {
			ctx: globalConstants.ctx
		})
	})
}



const POST_CREATE_CLUB = (req, res) => {
	function query(data, fn) {
		dbf.insertClubData(data, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		console.log(req.body)
		let name = req.body.clubName
		let date = datetimenow()
		let description = req.body.description
		let clubModel = model.Club(name, date, description, [model.ClubMember(accountId, "admin")])
		console.log(clubModel)
		query(clubModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		})
	})
}



module.exports = {
	GET_CLUB: GET_CLUB,
	SHOW_CLUB_ID: SHOW_CLUB_ID,
	GET_CREATE_CLUB: GET_CREATE_CLUB,
	POST_CREATE_CLUB: POST_CREATE_CLUB
}


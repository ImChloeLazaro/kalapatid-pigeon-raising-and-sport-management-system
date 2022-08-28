const globalConstants = require("../../constants/constants")
const { verifyLogin } = require("../../lib/toolkit")


let clubs = [
	{ _id: 1, name: "club 1" },
	{ _id: 2, name: "club 2" },
	{ _id: 3, name: "club 3" },
	{ _id: 4, name: "club 4" },
	{ _id: 5, name: "club 5" },
	{ _id: 6, name: "club 6" },
	{ _id: 7, name: "club 7" },
	{ _id: 8, name: "club 8" },
]

const GET_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("club/index.html", {
			ctx: globalConstants.ctx,
			clubs: clubs
		});
	})

}
const GET_CLUB_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		console.log(req.query)
		return res.render("club/show-club.html", {
			ctx: globalConstants.ctx,
			clubs: clubs
		});
	})

}





const POST_CREATE_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {

		let clubName = req.body.clubName
		return res.render("club/create-club.html", {
			ctx: globalConstants.ctx,
			clubName: clubName
		})
	})
}

const POST_SAVE_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let data = req.body
		console.log(data)
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/clubs')

	})
}




module.exports = {
	GET_CLUB: GET_CLUB,
	GET_CLUB_ID: GET_CLUB_ID,
	POST_CREATE_CLUB: POST_CREATE_CLUB,
	POST_SAVE_CLUB: POST_SAVE_CLUB
};
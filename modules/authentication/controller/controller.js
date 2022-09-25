require("dotenv").config()
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');

const tk = require("../lib/toolkit")
const model = require("../model/model")
const sendEmail = require('../lib/mail')
const dbf = require("../db/db-functions")

const globalConstants = require("../../../constants/constants");
const { insertProfileData } = require("../../profile/db/db-functions")
const { Profile } = require("../../profile/model/model")

const ObjectId = require('mongodb').ObjectId;


const GET_LOGIN = (req, res) => {
	res.render("auth/index.html", { ctx: globalConstants.ctx, isNotAuthenticated: false })
}




const POST_LOGIN = (req, res) => {
	let username = req.body.username
	let password = req.body.password

	const authenticate = (dataArray) => {
		let isMatched = false
		let id = null
		dataArray.forEach(v => {
			let isCredentialMatched = (v.username === username && bcryptjs.compareSync(password, v.password))
			if (isCredentialMatched) {
				id = v._id
				isMatched = true;
			}
		})

		return [isMatched, id]
	}

	const redirect = (accountId) => {
		req.session.accountId = accountId
		req.session.username = username;
		req.session.isAuthenticated = true

		//insert data as online
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home')
	}

	const render = (isNotAuthenticated) => {
		return res.render("auth/index.html", {
			ctx: globalConstants.ctx,
			isNotAuthenticated: isNotAuthenticated
		})
	}

	const query = () => {
		dbf.getAllAcountData((err, dataArray) => {
			let isNotAuthenticated = true
			if (dataArray == null) {
				render(isNotAuthenticated)
				return
			}
			let auth = authenticate(dataArray)
			let isMatched = auth[0]
			let accountId = auth[1]

			if (isMatched) {
				redirect(accountId)
			} else {
				render(isNotAuthenticated)
			}
		})
	}
	query()
}



const GET_REGISTER = (req, res) => {
	return res.render("auth/register.html", {
		ctx: globalConstants.ctx,
		isRegistered: false,
		isError: false
	})
}



const POST_REGISTER = (req, res) => {
	let isError = false;
	let isSuccess = false;
	const uid = new ObjectId()
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req.body);
		console.log(errors.array())
		isError = true;
		return res.render("auth/register.html", {
			ctx: globalConstants.ctx,
			isRegistered: isSuccess,
			isError: true,
			errors: errors.array()
		})
	} else {
		dbf.insertAccount(model.Account(
			uid,
			req.body.firstname,
			req.body.middlename,
			req.body.lastname,
			req.body.birthday,
			tk.codeGenerator(),
			req.body.phone,
			req.body.email,
			req.body.username,
			bcryptjs.hashSync(req.body.password, 13)

		), (err) => {
			if (err == undefined) {
				dbf.insertAddress(
					new model.Address(
						uid,
						req.body.barangay,
						req.body.townCity,
						req.body.province
					),
					(err) => {
						if (err != undefined) {
							isError = true;
							isSuccess = false;
							console.log("Address Insertion Error: ", err);
						}
					})
				isSuccess = true;

				insertProfileData(new Profile(uid.toString(), "hello world!" + req.body.username), (err) => {
					if (err != undefined) {
						console.log("Profile Insertion Error: ", err);
					}
				});

			} else {
				isError = true;
				isSuccess = false;
				console.log("Account Insertion Error:", err);
			}


			return res.render("auth/register.html",
				{
					ctx: globalConstants.ctx,
					isRegistered: isSuccess,
					isError: isError
				}
			)
		})
	}

}





const GET_RECOVERY = (req, res) => {
	return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: true })
}

const POST_RECOVERY = (req, res) => {
	const emailHandler = (docs) => {
		console.log(`recovery code:`.bgGreen.white + `${docs.recoveryCode.toString()}`.yellow)
		sendEmail(`Recovery code: ${docs.recoveryCode.toString()}`, req.body.email)
			.then(result => {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/recovery/confirm')
			})
			.catch(err => {
				console.error(err);
				return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: false })
			})
	}

	const dbQuery = () => {
		dbf.getAcountDataByEmail(req.body.email, (docs) => {
			if (docs == null) {
				return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: false })
			}
			emailHandler(docs)
		})
	}
	dbQuery()
}



const GET_RECOVERY_CONFIRM = (req, res) => {
	return res.render("auth/confirm-recovery.html", { ctx: globalConstants.ctx })
}
const POST_RECOVERY_CONFIRM = (req, res) => {
	if (req.body.password1 === req.body.password2) {
		let password = req.body.password1
		let recoverycode = req.body.recoverycode
		dbf.updateAccount(recoverycode, password)
	}

	return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/auth/login")
}


const GET_LOGOUT = (req, res) => {
	req.session.isAuthenticated = false
	return res.redirect(globalConstants.ctx.DOMAIN_NAME)
}





module.exports = {
	GET_LOGIN: GET_LOGIN,
	POST_LOGIN: POST_LOGIN,
	GET_REGISTER: GET_REGISTER,
	POST_REGISTER: POST_REGISTER,
	GET_RECOVERY: GET_RECOVERY,
	POST_RECOVERY: POST_RECOVERY,
	GET_RECOVERY_CONFIRM: GET_RECOVERY_CONFIRM,
	POST_RECOVERY_CONFIRM: POST_RECOVERY_CONFIRM,
	GET_LOGOUT: GET_LOGOUT
}
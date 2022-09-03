require("dotenv").config()
const bcryptjs = require('bcryptjs')
const tk = require("../lib/toolkit")
const model = require("../model/model")
const sendEmail = require('../lib/mail')
const dbo = require("../db/db-operation")
const globalConstants = require("../../../constants/constants");


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
		return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home')
	}

	const render = (isNotAuthenticated) => {
		return res.render("auth/index.html", {
			ctx: globalConstants.ctx,
			isNotAuthenticated: isNotAuthenticated
		})
	}

	const query = () => {
		dbo.getAllAcountData((err, dataArray) => {
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



	dbo.insertAccount(model.Account(
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

			dbo.insertAddress(
				new model.Address(
					uid,
					req.body.houseStreet,
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





const GET_RECOVERY = (req, res) => {
	return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: true })
}

const POST_RECOVERY = (req, res) => {
	const emailHandler = (docs) => {
		sendEmail(`Recovery code: ${docs.recoveryCode.toString()}`, req.body.email)
			.then(result => {
				console.log(result)
				res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/resetpassword')
			})
			.catch(error => {
				console.error(error);
				return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: false })
			})

	}
	const dbQuery = () => {
		dbo.getAcountDataByEmail(req.body.email, (docs) => {
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
		dbo.getAcountDataByCode(req.body.recoverycode, () => {
			let password = req.body.password1
			let recoverycode = req.body.recoverycode

			dbo.updateAccount(recoverycode, password, (err) => {
				if (err !== undefined) {
					console.log(err);
				}
			})
		})
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
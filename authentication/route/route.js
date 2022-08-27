require("dotenv").config()
const express = require("express")
const bcryptjs = require('bcryptjs')
const dbo = require("../db/db-operation")
const model = require("../model/model")
const sendEmail = require('../lib/mail')
// const constants = require("../constants");
const globalConstants = require("../../constants/constants");
const tk = require("../lib/toolkit")




const ObjectId = require('mongodb').ObjectId;


let loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
	res.render("auth/index.html", { ctx: globalConstants.ctx, isNotAuthenticated: false })
})




loginRoute.post("/", (req, res) => {
	let username = req.body.username
	let password = req.body.password

	console.log(username, password)
	dbo.getAllAcountData((err, dataArray) => {
		let isMatched = false;

		dataArray.forEach(v => {
			let isCredentialMatched = (v.username === username && bcryptjs.compareSync(password, v.password))
			if (isCredentialMatched) {
				isMatched = true;
			}
		})
		if (isMatched) {
			req.session.username = username;
			req.session.isAuthenticated = true
			console.log(req.session)
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + '/home')

		} else {
			return res.render("auth/index.html", {
				ctx: globalConstants.ctx,
				isNotAuthenticated: true
			}
			)
		}
	})
})


let registerRoute = express.Router();
registerRoute.get("/", (req, res) => {
	return res.render("auth/register.html", {
		ctx: globalConstants.ctx,
		isRegistered: false,
		isError: false
	})
})

registerRoute.post("/", (req, res) => {
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

})







let recoveryRoute = express.Router();

recoveryRoute.get("/", (req, res) => {
	return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: true })
})

recoveryRoute.post("/", (req, res) => {
	dbo.getAcountDataByEmail(req.body.email, (docs) => {
		if (docs == null) {
			return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: false })
		}
		sendEmail(`Recovery code: ${docs.recoveryCode.toString()}`, req.body.email)
			.then(result => {
				console.log(result)
				res.redirect(globalConstants.ctx.DOMAIN_NAME + '/auth/resetpassword')
			})
			.catch(error => {
				console.error(error);
				return res.render("auth/recovery.html", { ctx: globalConstants.ctx, HAS_EMAIL_VALUE: false })
			})

	})
})





recoveryRoute.get("/confirm", (req, res) => {
	return res.render("auth/confirm-recovery.html", { ctx: globalConstants.ctx })
})

recoveryRoute.post("/confirm", (req, res) => {
	console.log(req.body);
	if (req.body.password1 === req.body.password2) {
		dbo.getAcountDataByCode(req.body.recoverycode, (docs) => {
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
})



let logoutRoute = express.Router();
logoutRoute.get("/", (req, res) => {

	req.session.isAuthenticated = false
	return res.redirect(globalConstants.ctx.DOMAIN_NAME)
})





module.exports = {
	loginRoute: loginRoute,
	registerRoute: registerRoute,
	recoveryRoute: recoveryRoute,
	logoutRoute: logoutRoute
}
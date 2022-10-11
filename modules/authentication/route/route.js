require("dotenv").config()
const express = require("express")
const { checkSchema } = require('express-validator');


const controller = require('../controller/controller')
const registrationSchema = require("../validation/registration/registrationSchema")

let loginRoute = express.Router();

loginRoute.get("/", controller.GET_LOGIN)
loginRoute.post("/", controller.POST_LOGIN)

let registerRoute = express.Router();
registerRoute.get("/", controller.GET_REGISTER)
registerRoute.post("/", checkSchema(registrationSchema), controller.POST_REGISTER)
registerRoute.get("/authenticate", controller.GET_REGISTER_AUTHENTICATE)
registerRoute.post("/authenticate", controller.POST_REGISTER_AUTHENTICATE)

let recoveryRoute = express.Router();
recoveryRoute.get("/", controller.GET_RECOVERY)
recoveryRoute.post("/", controller.POST_RECOVERY)

recoveryRoute.get("/confirm", controller.GET_RECOVERY_CONFIRM)
recoveryRoute.post("/confirm", controller.POST_RECOVERY_CONFIRM)

let logoutRoute = express.Router();
logoutRoute.get("/", controller.GET_LOGOUT)



module.exports = {
	loginRoute: loginRoute,
	registerRoute: registerRoute,
	recoveryRoute: recoveryRoute,
	logoutRoute: logoutRoute
}
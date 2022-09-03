const express = require("express");
const controller = require("./controller/controller");
const dashboard = express.Router()

dashboard.get("/", controller.GET_DASHBOARD)


module.exports = dashboard;







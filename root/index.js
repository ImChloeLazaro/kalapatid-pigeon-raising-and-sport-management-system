const express = require("express");
const controller = require("./controller/controller");

const root = express.Router()

root.get("/", controller.REDIRECT)
root.get("/home", controller.GET_HOME)


module.exports = root;







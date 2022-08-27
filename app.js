
const express = require("express")
const constants = require('./constants/constants')
const config = require('./config/config')

const app = express()

config(app, express, constants, __dirname)

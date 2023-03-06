const express = require('express');
const {AddEvents } = require('../controllers/Payment.controller');
const router = express.Router()
const path = require("path");


 

/* add user */
router.post('/pay',  AddEvents)

module.exports = router;
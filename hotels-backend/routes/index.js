var express = require('express');
var router = express.Router();

//require the controller so the logic in the file can be used
const hotelController = require('../controllers/hotelController')

/* GET home page. */
router.get('/', hotelController.homePage);

//Get all hotels page
router.get('/all', hotelController.listAllHotel)

module.exports = router;

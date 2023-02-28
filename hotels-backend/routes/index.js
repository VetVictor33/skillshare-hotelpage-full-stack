var express = require('express');
var router = express.Router();

//require the controller so the logic in the file can be used
const hotelController = require('../controllers/hotelController')

/* GET home page. */
router.get('/', hotelController.homePageFilters);

//Get all hotels page
router.get('/all', hotelController.listAllHotel);
router.get('/countries', hotelController.listAllCountries);

//Admin routers
router.get('/admin', hotelController.adminPage);
router.get('/admin/add', hotelController.createHotelGet);
router.post('/admin/add', hotelController.createHotelPost);

module.exports = router;

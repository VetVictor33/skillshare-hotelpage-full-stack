var express = require('express');
var router = express.Router();

//require the controller so the logic in the file can be used
const hotelController = require('../controllers/hotelController');
const hotel = require('../models/hotel');

/* GET home page. */
router.get('/', hotelController.homePageFilters);

//Get all hotels page
router.get('/all', hotelController.listAllHotel);
router.get('/all/:hotelId', hotelController.hotelDetail);
router.get('/countries', hotelController.listAllCountries);
router.get('/countries/:country', hotelController.listHotelsByCountry);

//Admin routers
router.get('/admin', hotelController.adminPage);
router.get('/admin/add', hotelController.createHotelGet);
router.post('/admin/add', hotelController.createHotelPost);
router.get('/admin/edit-remove', hotelController.editRemoveGet);
router.post('/admin/edit-remove', hotelController.editRemovePost);
router.get('/admin/:hotelId/update', hotelController.updateHotelGet);
router.post('/admin/:hotelId/update', hotelController.updateHotelPost);
router.get('/admin/:hotelId/delete', hotelController.deleteHotelGet);
router.post('/admin/:hotelId/delete', hotelController.deleteHotelPost);

module.exports = router;

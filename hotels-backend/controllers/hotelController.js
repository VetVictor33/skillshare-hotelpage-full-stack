const Hotel = require('../models/hotel')

exports.listAllHotel = async (req, res, next) => {
    try {
        const allHotels = await Hotel.find({ availabe: { $eq: true } })
        res.render('all_hotels', { title: "All hotels", allHotels })
    } catch (error) {
        next(error)
    }
}

exports.listAllCountries = async (req, res, next) => {
    try {
        const allCountries = await Hotel.distinct('country');
        res.render('all_countries', { title: 'Browse by country', allCountries });
    } catch (error) {
        next(error)
    }
}

exports.homePageFilters = async (req, res, next) => {
    try {
        const hotels = await Hotel.aggregate([
            { $match: { availabe: true } },
            { $sample: { size: 3 } }
        ]);
        const countries = await Hotel.aggregate([
            { $group: { _id: '$country' } },
            { $sample: { size: 3 } }
        ])
        res.render('index', { title: "Let's Travel!", countries, hotels });
    } catch (error) {
        next(error)
    };
}

exports.createHotelGet = (req, res) => {
    res.render('add_hotel', { title: "Add new hotel" })
}

exports.createHotelPost = async (req, res, next) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.redirect(`/all/${hotel._id}`);
    } catch (error) {
        next(error)
    }
}

exports.adminPage = (req, res) => {
    res.render('admin', { title: 'Admin' });
}
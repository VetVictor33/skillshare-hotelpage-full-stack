const Hotel = require('../models/hotel');
const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = multer.diskStorage({});

const upload = multer({ storage });

exports.upload = upload.single('image');

exports.pushToCloudinary = (req, res, next) => {
    if (req.file) {
        cloudinary.uploader.upload(req.file.path)
            .then((result) => {
                req.body.image = result.public_id;
                next();
            })
            .catch(() => {
                res.redirect('/admin/add')
            })
    } else {
        next();
    }
}

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
        const hotels = Hotel.aggregate([
            { $match: { available: true } },
            { $sample: { size: 3 } }
        ]);
        const countries = Hotel.aggregate([
            { $group: { _id: '$country' } },
            { $sample: { size: 6 } }
        ])

        const [filteredHotels, filteredCountries] = await Promise.all([hotels, countries])

        res.render('index', { title: "Let's Travel!", filteredCountries, filteredHotels });
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

exports.editRemoveGet = (req, res) => {
    res.render('edit_remove', { title: "Edit and Remove Hotels" })
}

exports.editRemovePost = async (req, res, next) => {
    try {
        const hotelId = req.body.hotel_id || null;
        const hotelName = req.body.hotel_name || null;

        const hotelData = await Hotel.find({
            $or: [
                { _id: hotelId },
                { hotel_name: hotelName }
            ]
        }).collation({
            locale: 'en',
            strength: 2
        });

        if (hotelData.length > 0) {
            res.render('hotel_detail', { title: 'Add or Remove Hotel', hotelData })
            return
        } else {
            res.redirect('/admin/edit-remove')
        }
    } catch (error) {
        next(error)
    }
}

exports.updateHotelGet = async (req, res, next) => {
    try {
        const hotel = await Hotel.findOne({ _id: req.params.hotelId })
        res.render('add_hotel', { title: 'Update hotel', hotel })
    } catch (error) {
        next(error)
    }
}

exports.updateHotelPost = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findByIdAndUpdate(hotelId, req.body, { new: true });
        res.redirect(`/all/${hotelId}`)
    } catch (error) {
        next(error)
    }
}

exports.deleteHotelGet = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findOne({ _id: hotelId });
        res.render('add_hotel', { title: 'Delete Hotel', hotel });
    } catch (error) {
        next(error)
    }
}

exports.deleteHotelPost = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const hotel = await Hotel.findByIdAndRemove({ _id: hotelId });
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

exports.hotelDetail = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const hotelData = await Hotel.find({ _id: hotelId });
        res.render('hotel_detail', { title: "Let's travel", hotelData })
    } catch (error) {
        next(error)
    }
}

exports.listHotelsByCountry = async (req, res, next) => {
    try {
        const country = req.params.country;
        const countryList = await Hotel.find({ country: country });
        res.render('hotels_by_country', { title: `Browse by Country: ${country}`, countryList })
    } catch (error) {
        next(error)
    }
}

exports.searchResults = async (req, res, next) => {
    try {
        const searchQuery = req.body;
        const parsedStarts = parseInt(searchQuery.stars);
        const parsedSort = parseInt(searchQuery.sort);
        const searchData = await Hotel.aggregate([
            { $match: { $text: { $search: `\"${searchQuery.destination}\"` } } },
            { $match: { available: true, star_rating: { $gte: parsedStarts } } },
            { $sort: { cost_per_night: parsedSort } }
        ])
        res.render('search_results', { title: 'Search results', searchQuery, searchData });
    } catch (error) {
        next(error)
    }
}
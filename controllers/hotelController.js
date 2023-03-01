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
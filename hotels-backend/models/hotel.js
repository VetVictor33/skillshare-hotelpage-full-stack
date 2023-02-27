const mongoose = require('mongoose');

//this shape how the hotel data must be added
const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: true,
        max: 32,
        trim: true
    },
    hotel_description: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    star_rating: {
        type: Number,
        required: true,
        max: 5,
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    cost_per_night: {
        type: Number,
        required: true
    },
    availabe: {
        type: Boolean,
        require: true
    }
});

moduale.exports = mongoose.model('Hotel', hotelSchema);
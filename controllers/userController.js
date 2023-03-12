const User = require('../models/user');
const Passport = require('passport');
const Hotel = require('../models/hotel')
const Order = require('../models/order')

//Express validator
const { check, validationResult } = require('express-validator');
const { body } = require('express-validator');


const queryString = require('querystring');

exports.signUpGet = (req, res) => {
    res.render('sign_up', { title: 'User Sign up' });
}

exports.signUpPost = [
    //Validate data
    check('first_name').isLength({ min: 1 }).withMessage('Fisrt name must be specified')
        .isAlphanumeric().withMessage('First name must be alphanumeric'),
    check('surname').isLength({ min: 1 }).withMessage('surname must be specified')
        .isAlphanumeric().withMessage('surname must be alphanumeric'),
    check('email').isEmail().withMessage('Invalid email adress'),
    check('confirm_email')
        .custom((value, { req }) => value === req.body.email)
        .withMessage('Email adresses do not match'),
    check('password').isLength({ min: 6 })
        .withMessage('Invalid password, password must be a minumum of six characters'),
    check('confirm_password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    body('*').trim().escape(),

    (req, res, next) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            res.render('sign_up', { title: 'Please fix the following erros:', erros: erros.array() })
            return;
        } else {
            const newUser = new User(req.body);
            User.register(newUser, req.body.password, function (error) {
                if (error) {
                    console.log('error while registering!', error);
                    return next(error);
                }
                next();
            });
        }
    }
]

exports.loginGet = (req, res) => {
    res.render('login', { title: "Login to continue" });
}

exports.loginPost = Passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'You are now logged in!!!',
    failureRedirect: '/login',
    failureFlash: 'Login failed, please try again'
});

exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('info', 'You are now logged out')
        res.redirect('/');
    });
}

exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        next();
        return;
    }
    res.redirect('/');
}

exports.createUserGet = (req, res) => {
    res.render('add_user', { title: "Add new user" });
}

exports.bookingConfirmation = async (req, res, next) => {
    try {
        const data = req.params.data;
        const searchData = queryString.parse(data);
        const hotel = await Hotel.find({ _id: searchData.id });
        res.render('confirmation', { title: 'Booking confirmation', hotel, searchData })
    } catch (error) {
        next(error)
    }
}

exports.orderPlaced = async (req, res, next) => {
    try {
        const data = req.params.data;
        const parsedData = queryString.parse(data);
        const order = new Order({
            user_id: req.user._id,
            hotel_id: parsedData.id,
            order_details: {
                duration: parsedData.duration,
                dateOfDeparture: parsedData.departure,
                numberOfGuests: parsedData.guestsN
            }
        });
        await order.save();
        req.flash('info', 'Thank you, your order has been placed!');
        res.redirect('/my-account');
    } catch (error) {
        next(error)
    }
}

exports.myAccount = async (req, res, next) => {
    try {
        const orders = await Order.aggregate([
            { $match: { user_id: req.user.id } },
            {
                $lookup: {
                    from: 'hotels',
                    localField: 'hotel_id', //local field ta u want to match
                    foreignField: '_id',    //the field to match in the other collection
                    as: 'hotel_data' // the key in wich the info will be shown
                }
            }
        ])
        res.render('user_account', { title: 'My Account', orders });
    } catch (error) {
        next(error)
    }
}

exports.allOrders = async (req, res, next) => {
    try {
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'hotels',
                    localField: 'hotel_id', //local field ta u want to match
                    foreignField: '_id',    //the field to match in the other collection
                    as: 'hotel_data' // the key in wich the info will be shown
                }
            }
        ])
        res.render('orders', { title: 'All Orders', orders });
    } catch (error) {
        next(error)
    }
}
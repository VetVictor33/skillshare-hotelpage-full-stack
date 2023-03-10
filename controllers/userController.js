const User = require('../models/user');
const Passport = require('passport');

//Express validator
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

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

    sanitize('*').trim().escape(),

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
    failureRedirect: '/login'
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
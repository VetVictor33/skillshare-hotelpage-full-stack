const User = require('../models/user');

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
    check('confirm_passsword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    (req, res, next) => {
        const erros = validationResult(req);

        if (!erros.isEmpty()) {
            res.render('sign_up', { title: 'Please fix the following erros:', erros: erros.array() })
        } else {

        }
    }
]
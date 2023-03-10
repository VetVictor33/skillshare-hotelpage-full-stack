const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',
        trim: true,
        max: 33
    },
    surname: {
        type: String,
        required: 'Surname is required',
        trim: true,
        max: 33
    },
    email: {
        type: String,
        required: 'Email adress is required',
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: 'Password is required',
        bcrypt: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongooseBcrypt);

module.exports = mongoose.model('User', userSchema);
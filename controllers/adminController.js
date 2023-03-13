const User = require('../models/user');

exports.listUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.render('users_list', { title: 'All Users', users });
    } catch (error) {
        next(error)
    }
}

exports.updateUserStatus = async (req, res, next) => {
    try {
        if (req.params.userStatus === 'admin') {
            const user = await User.findOneAndUpdate(
                { email: req.params.userEmail },
                { isAdmin: false });

            req.flash('info', `User ${req.params.userName} has been set to Admin`);
            res.redirec('/admin/users')
        }
        else if (req.params.userStatus === 'regularUser') {
            const user = await User.findOneAndUpdate(
                { email: req.params.userEmail },
                { isAdmin: true });
            req.flash('info', `User ${req.params.userName} has been set to Regular User`);
            res.redirec('/admin/users')
        }

    } catch (error) {
        next(error)
    }
}
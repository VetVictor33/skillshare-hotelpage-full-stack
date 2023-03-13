const Order = require('../models/order');

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findByIdAndRemove({ _id: orderId });
        req.flash('info', `Order ref: ${orderId} has been deleted`);
        res.redirect('/my-account')
    } catch (error) {
        next(error)
    }
}
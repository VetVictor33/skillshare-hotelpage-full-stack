exports.homePage = (req, res) => {
    res.render('index', { title: "Let's Travel!" });
}

exports.listAllHotel = (req, res) => {
    res.render('all_hotels', { title: "All hotels" })
}
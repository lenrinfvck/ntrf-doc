function show(req, res, next) {
	if (req.session.uid) {
		res.render("index", {
			locals: {
				user: req.session.uid
			}
		});
	} else {
		res.render("index");
	}
}

module.exports = show;
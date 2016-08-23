var Entry = require("../models/m_msg.js")

function show(req, res, next) {
    var page = parseInt(req.param("page"), 10);
    Entry.getRange(page, function(err, entries, length) {
        if(err) return next(err);
        var allpage = Math.ceil(length/5);

        res.render("index", {
            locals: {
                user: req.session.uid || ""
            },
            entries: entries,
            page: page,
            allpage: allpage
        });
    });
	
}

module.exports = show;
var Entry = require("../models/m_msg");

exports.list = function(req, res, next) {
    Entry.getRange(function(err, entries) {
        if(err) return next(err);
        res.render ("entries", {
            title:"Entries",
            entries: entries
        });
    });
};

exports.form = function(req, res, next) {
    res.render("post");
};

exports.submit = function(req, res, next) {
    var data = req.body.entry;

    var entry = new Entry({
        "username" : req.session.uid,
        "title" : data.title,
        "body" : data.body
    });

    entry.save(function(err) {
        if(err) return next(err);
        res.redirect("/");
    });
}
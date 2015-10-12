function show(req, res, next) {
    if(req.session.uid) {
        res.end("hellow"+req.session.uid);
    } else {
        res.end("hellow");
    }
}

module.exports = show;
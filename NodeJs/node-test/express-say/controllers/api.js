exports.user = function(req, res, next) {
    var id = req.params.id;
    if(req.session.uid == req.params.id){
        res.json(req.session.user);
    } else {
        res.send(404);
    }
}
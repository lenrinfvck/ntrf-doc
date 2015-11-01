var db = require("../my_modules/mongoose");

var schema = new db.Schema({
    entries: String
});

var Msg = db.model("Msg", schema);

function Entry(obj) {
    for(var key in obj) {
        this[key] = obj[key];
    }
}
Entry.prototype = {
    save : function(fn) {
        var entryJSON = JSON.stringify(this);
        Msg.create({
                entries: entryJSON
            },
            function(err) {
                if(err) return fn(err);
                fn();
            }
        )
    }
}
Entry.getRange = function(page, fn) {
    var page = page;
    var perpage = 5;
    Msg.count({}, function(err, count) {
        if (err) return next(err);

        Msg.find({}, null, {skip: (page-1)*perpage, limit: perpage}, function(err, items) {
        if (err) return next(err);
        
        var entries = [];
        items.forEach(function(item) {
            entries.push(JSON.parse(item.entries));
        });
        fn(null, entries, count);
    });
    });
    
}

module.exports = Entry;
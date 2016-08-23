var db = require("../my_modules/mongoose");
var Schema = db.Schema;
var ObjectId = Schema.Types.ObjectId;

var movieSchema = new db.Schema({
    doctor: {
        type: String,
        required: true //非空验证
    }
    title: {
        en: String,
        ch: String
    }
    edit: {
        type: ObjectId,
        ref: 'Edit' //指向该模型
    }
    language: {
        type: String,
        enum: ['en', 'cn']  //只能接受这些值
        validate: [validator, err] //自定义验证函数
    }
    year: {
        type: Number,
        min: 1993,
        max: 2020
    }
    mate: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

//[虚拟属性] 不会存入数据库的属性
movieSchema.virtual("title.full").get(function() {
    return this.title.en + " " + this.title.ch;
}
//反解
movieSchema.virtual("title.full").set(function(title) {
    var split = title.split(" ");
    this.title.en = split[0];
    this.title.ch = split[1];
}

movieSchema.pre("save", function(next) {
    if(this.isNew) {
        this.meta.createAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

//继承方法,只有实例能调用
User.methods = {
    comparePass: function(_psd, fn) {
        bcrypt.compare(_psd, this.pass, function(err, isMatch) {
            if(err) return fn(err);

            fn(null, isMatch);
        });
    }
}

movieSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort("meta.updateAt")
            exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            exec(cb)
    }
}

var Movie = db.model("Movie", movieSchema);

module.exports = Movie;













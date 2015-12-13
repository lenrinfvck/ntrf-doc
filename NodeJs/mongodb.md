
###直接查询
```js
PersonModel.findOne({'name.last':'dragon'},'some select',function(err,person){
//如果err==null，则person就能取到数据
});
```
###链式查询
```js
 Person
      .find({ occupation: /host/ })
      .where('name.last').equals('Ghost')
      .where('age').gt(17).lt(66)
      .where('likes').in(['vaporizing', 'talking'])
      .limit(10)
      .sort('-occupation')
      .select('name occupation')
      //知道exec才返回结果，之前返回值都是query
      .exec(callback);
```

###关联查询
```js
//模式里有引用属性
var comment = new db.Schema({
    from: {
        type: ObjectId,
        ref: 'User' //指向该模型
    }
}
//查询时使用populate
Comment
    .find({movie: id})
    .populate('from', 'name')
    .exec(function(err, comments) {
        res.render('detail', {
            title: 'xx',
            comments: comments
        });
    });
```

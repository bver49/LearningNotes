var Post = require('./model/Post');

Post.sync({force: true}).then(function () {

});

var Comment = require('./model/Comment');

Comment.sync({force: true}).then(function () {

});

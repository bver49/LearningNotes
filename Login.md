```js
var express = require("express");
var app = express();
var session = require("express-session");
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 12 },
  secret:"secret",
  saveUninitialized:true
}));

//Middlware
app.use(function(req, res, next) {
  if(req.session.isLogin){
    User.FindbyID("user",req.session.userid,function(user){
      req.user = user;
      next();
    });
  }
  else {
    next();
  }
});

//Login auth
app.post('/users/auth',function(req,res){
  //Find user and check pw
  req.session.isLogin = 1;
  req.session.userid = user.id;
  res.redirect("/");
});

//Logout
app.get('/users/logout',function(req, res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

```

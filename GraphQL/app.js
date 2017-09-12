var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var path = require("path");
var graphql = require("graphql").graphql;
var graphqlHTTP = require('express-graphql');
var schema = require("./schema");
var app = express();

app.set("views",path.join(__dirname,"view"));  //view的路徑位在資料夾view中
app.set("view engine","ejs");                   //使用ejs作為template

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({ type: 'application/graphql' }));

app.use("/assets",express.static(__dirname + "/assets"));

//Handle sessions and cookie
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret:"secret",
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser("secretString"));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.post('/graphql',function(req, res){
	graphql(schema,req.body).then(function(result){
		res.send(JSON.stringify(result, null, 2));
	});
});

app.get('*',function(req, res){
  res.sendFile('view/index.html',{root: __dirname });
});

app.listen( process.env.PORT || 4000);
console.log("running on port 4000");

# Loopback指令

## 創立專案

```sh
lb
```

## 設定資料來源(資料庫)

```sh
lb datasource
```

## 建立Model與設定欄位

若資料來源為database，基礎類別設定為 PersistedModel，建立好後基本的CRUD指令Loopback也都處理好了

Model則是包裝成ORM的模式

```sh
lb model		
```

## 擴展API

在/models/ModelName.js加入新method的內容以及路由規則

```js
module.exports = function(Model) {
  Model.newmethod = function(id, cb) {
    if (id) {
      cb(null, response);
    }
    else {
      cb(null, response);
    }
  };

  //擴展的method的路由規則
  Model.remoteMethod('newmethod', {
    http: {
      path: '/newmethod/:id',
      verb: 'get'
    },
    //接受參數的格式
    accepts: [{
      arg: 'id',
      type: 'string',
      http: {
        source: 'path'          //等同於express的params 
      }
    },
    { 
      arg: 'querystring',
      type: 'string',
      http: {
        source: 'query'        //等同於express的query
    },
    {
      arg: 'body',
      type: 'object',
      http: {
        source:'body'         //取得等同於expresse的req.body的內容，為一個object 
      }
    },
    { 
      arg: 'id',
      type: 'object',
      http: {
        source: 'req'          //等同於express的req
    },
    { 
      arg: 'querystring',
      type: 'object',
      http: {
        source: 'res'         //等同於express的res，可以在method中用res.send或res.render取代原有的callback做response
    },{ 
      arg: 'custom',
      type: 'string',
      http:function(ctx){            //透過req的資料自己處理參數內容
        var req = ctx.req;      
        return req.body.custom;
    }],
    //回傳的類型
    returns: {
      arg: 'returnvalue',
      type: 'string'
    }
  });
}
```

也可以在 /models/model.json加入路由規則，會被model.js中的路由規則設定覆蓋

```js
...
  "methods": {
    "newmethod": {
      //接受的參數
      "accepts": [{
          "arg": "id",
          "type": "string",
          "required": true,
          "http": { 
            "source":"path"       //等同於express的params
          }
        },
        {
          "arg": "querystring",
          "type": "string",
          "http": { 
            "source":"query"       //等同於express的query
          }
        },
        {
          "arg":"req",
          "type":"object",
          "http":{
            "source":"req"         //等同於express的req
          }
        },
        {
          "arg":"res",
          "type":"object",
          "http":{
            "source":"res"        //等同於express的res，可以在method中用res.send或res.render取代原有的callback做response
          }
        }
      ],
      //路由設定
      "http": {
        "verb": "GET",         
        "path": "/newmethod/:id"       //若有要取得source為path的參數需要在http的path做設定
      }
    }
  }
...
```

## 設定靜態檔案路徑

在 server/middleware.json 加入

```json
  "files": {
    "loopback#static": {
      "params": "$!../client"
    }
  }
```

之後就可以在client資料夾中 加入 HTML、JS、CSS檔案

## 擴充Route && 加入Middleware

在/boot/route.js 加入

```js
module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  
  //加入自訂路由
  router.get('/custom',function(req,res){
  
  });
  
  //加入middleware
  
  router.use(function(req,res,next){
    //do something
    next();
  });
  
  //或是
  server.use(function(req,res,next){
    //do something
    next();
  })
  
  server.use(router);
};
```

或是在 /server/server.js 加入，像Express的語法

```js
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

//加入body-parser
var bodyParser = require('body-parser'); 

app.disable('x-powered-by');

//把body-parser 加入 middleware
app.use(bodyParser.urlencoded({extended: true}));

//設定模板引擎
app.set('view engine', 'ejs');

//加入自訂路由
app.get('/use',function(req,res){
    res.send("use")
});

//加入middleware

app.use(function(req,res,next){
  //do something
  next();
});

```


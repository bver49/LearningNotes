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

在common/models/ModelName.js

```js
module.exports = function(Model) {
  Model.newmethod = function(params, cb) {
    if (params) {
      cb(null, response);
    }
    else {
      cb(null, response);
    }
  };

  //擴展的method相關設定
  Model.remoteMethod('newmethod', {
    http: {
      path: '/newmethod',
      verb: 'get'
    },
        //接受的格式
    accepts: {
      arg: 'id',
      type: 'string',
      http: {
        source: 'query'
      }
    },
    //回傳的類型
    returns: {
      arg: 'params',
      type: 'string'
    }
  });
}
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

## 擴充Route

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


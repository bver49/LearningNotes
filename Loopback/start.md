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
  Model.newmethod = function(params,cb) {
    if(params){
  	  cb(null, response);
    }else{
	    cb(null, response);
    }
  };

  //擴展的method相關設定
  Model.remoteMethod(
    'newmethod',
    {
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
        arg: 'status',
        type: 'string'
      }
    }
  );
}
```

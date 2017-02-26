# JS筆記

## 立即函數

在許多框架的原始碼中常常看見這種寫法，函數會在啟動時立刻執行，優點是可以不用擔心污染全域變數，變數生命週期只存在於函數內

寫法如下：

```javascript
(function(){   
  //code
})();
```

也可以丟給他變數

```javascript
(function(word){   
  console.log(word);  //Hi
})("Hi");
```


## Promise
簡單的promise範例，模擬取得post在找到對應的user的情況，不使用promise的結果如下：

```javascript
var posts = [{
  user_id: '1',
  title: 'Title',
  content: 'contentcontent'
}];

var users = [{
  id: '1',
  name: 'Name'
}]

function getPosts(callback) {
  setTimeout(function () {
    callback(posts);
  }, 1000);
}

function getUsers(callback) {
  setTimeout(function () {
    callback(users)
  }, 1000);
}

getPosts(function(posts){
    console.log(posts);
  getUsers(function(users){
    console.log(users);
  });
});
```

這樣函數一多會形成 callback hell，所以改用 promise， promise 的作法如下，

函數結束時 return 一個 promise 物件，之後透過 then 來連接，

範例中程式執行的流程會先執行 getPosts ，然後最後將要回傳的 post 結果丟給 resolve，

接著從then取得post的內容，如果在 then 中又 return 一個 promise 物件就可以繼續一直接著 then 下去

```javascript
var posts = [{
  user_id: '1',
  title: 'Post 1',
  content: 'fake content'
}];

var users = [{
  id: '1',
  name: 'Name'
}]

function getPosts() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(posts);
    }, 1000);
  });
}

function getUsers() {
  return new Promise(function (resolve) {
    setTimeout( function() {
      resolve(users);
    }, 1000);
  });
}

getPosts().then(function(posts){
    console.log(posts);
    return getUsers();
  })
  .then(function (users) {
    console.log(users);
  });
```

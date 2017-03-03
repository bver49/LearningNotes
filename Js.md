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

## Prototype
prototype 只存在於 constructor function ，

\__proto\__ 則是出現在所有 object 上

### 創建類別不用使用 new 的做法
範例中創建一個 Counter 類別，有兩個屬性 num1 與 num2，

然後有一個 method sum 用來計算兩個數字的總和，

將 Counter 寫成一般函數，實際創建類別的為 Counter.init，

但是相關的 method 是綁在 Counter 上而非 Counter.init，

所以將 Counter.init 的 prototype 設為 Counter 的 prototype

```javascript
var Counter = function (num1,num2) {
  return new Counter.init(num1,num2);
}

Counter.prototype = {
  'sum': function () {
    console.log(this.num1+this.num2);
  }
}

Counter.init = function (num1,num2) {
  this.num1 = num1;
  this.num2 = num2;
}

Counter.init.prototype = Counter.prototype;

Counter(1,2).sum(); // 3
```

## Class
類似物件導向語言的class語法，基本的寫法：

```javascript
class Person {
  //constructor
  constructor(name) {
    this.name = name;
  }
  //method
  say() {
    console.log("My name is " + this.name);
  }
}

var student = new Person("Derek");

student.say(); //My name is Derek
```

繼承的做法：

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  getA() {return this.a}
}
class Student extends Person {
  constructor(name,grade) {
    super(name);
    this.grade = grade;
  }
  say(){
    console.log("Hi my name is " + this.name + "\nI'm in " + this.grade + " grade!");
  }
}
```

## Template string

在字串中插入變數，字串須使用｀包起來

```javascript
var num = 2;
console.log(`Number ${ num }`); // Number 2
```

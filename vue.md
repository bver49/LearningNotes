# Vue筆記

## Vue Instance

開始使用 vue 的時候要先 new 一個 vue instance ，vue instance 有以下的內容：

```javascript
new Vue({
  el:"selector", //要交給Vue控制的區域，透過selector選擇
  data:{         //這個區塊的data，不包含邏輯運算內容
  },
  methods:{    //這個區塊能使用的一些function
  },
  computed:{   //將data中的資料作轉換
  },
  watch:{    //data中的資料變化時會觸發
  },
  filter:{   //資料格式的轉換
  },
  mounted:function(){     //vue instance 建立好後執行，把ajax取得資料語法寫在這
  }
});
```

### Data

在HTML中使用 {{  }} 來顯示 data 中的資料，如下：

```javascript
new Vue({
  el:"#app",
  data:{
    count:0     
  }
});
```

```html
<div id="app">
  <p>{{ count }}</p> <!-- 0 -->
</div>
```

但是不能在 HTML tag 的 property 使用，錯誤示範如下：

```javascript
new Vue({
  el:"#app",
  data:{
    link:"http://google.com"    
  }
});
```

```html
<div id="app">
  <a href="{{ link }}">Go to google</a>
</div>
```

要在HTML的property使用要使用v-bind，正確的作法如下

```javascript
new Vue({
  el:"#app",
  data:{
    link:"http://google.com"    
  }
});
```

```html
<div id="app">
  <a v-bind:href="link">Go to google</a>
</div>
```

#### Access Data

取得 vue instance 中 data 內容的方式有兩種

在 vue instance 當中可以直接使用 this

```javascript
new Vue({
  el:"#app",
  data:{
    count: 0
  },
  methods:{    
    add: function(){
      this.count++;         //透過 this 改變 data 中的值
    }
  }
});
```

以外的地方，可以先將 vue instance 綁在一變數上，再直接由變數取得

```javascript
var vuePart = new Vue({        //將vue instance 綁在一個變數上
  el:"#app",
  data:{
    count: 0
  },
  methods:{    
  }
});

console.log(vuePart.count);  // 0
vuePart.count++;
console.log(vuePart.count); // 1

```

### Mounted

vue instance 一建立起來就會執行的部分，可以將從後端 api 撈取資料的部分寫在這 

```javascript
var postList = new Vue({       
  el:"#app",
  data:{
    posts: []
  },
  mounted:{
    //發ajax到後端拿資料
    $.ajax({   
      url: "https://api/getPost",
      type: "GET",
      success: function(posts){
        //將取得的資料存到 vue instance 中，再來可以用 v-for 把資料印出來等等
        postList.posts = posts;
      }
    });
  }
});
```

### Method

這個區塊能使用的一些 function，需搭配 v-on 綁定在 dom 上

```javascript
new Vue({
  el:"#app",
  data:{
  },
  methods:{    
    sayHello: function(){
      alert('Hi');  
    }
  }
});
```

```html
<div id="app">
  <a v-on:click="sayHello">打招呼</a>  <!-- 按下後跳出 alert -->
</div>
```

#### Event listening (v-on)

在HTML上加上v-on屬性並加上監聽的事件以及要執行的method名稱，事件的名稱如同原生的JS事件名稱，使用方法如下：

```javascript
new Vue({
  el:"#app",
  data:{
    count:0     
  },
  methods:{
    increase:function(){
      this.count++;        //透過 this 來 access data中的資料
    }
  }
});
```

```html
<div id="app">
  <div v-on:click="increase">Increase</div> <!-- 點擊按鈕就會執行 methods中的函數 increase -->
  <p>{{ count }}</p>
</div>
```

也可以直接改變data，如下：

```javascript
new Vue({
  el:"#app",
  data:{
    count:0     
  }
});
```

```html
<div id="app">
  <div v-on:click="count++">Increase</div> <!-- 點擊按鈕就會直接改變 data 中的 count -->
  <p>{{ count }}</p>
</div>
```

對於按鍵也可以監聽，如下：

```javascript
new Vue({
  el:"#app",
  data:{
    count:0     
  }
});
```

```html
<!-- 1 -->
<div id="app">
  <div v-on:keyup.enter="count++">Increase</div> <!-- 按下enter就會直接改變 data 中的 count -->
  <p>{{ count }}</p>
</div>
<!-- 2 -->
<div id="app">
  <div v-on:keyup.enter.space="count++">Increase</div> <!-- 按下enter或space就會直接改變 data 中的 count -->
  <p>{{ count }}</p>
</div>
```

若是點擊事件可以直接使用 @click

```javascript
new Vue({
  el:"#app",
  data:{
    count:0     
  },
  methods:{
    increase:function(){
      this.count++;        //透過 this 來 access data中的資料
    }
  }
});
```

```html
<div id="app">
  <div @click="increase">Increase</div> <!-- 點擊按鈕就會執行 methods中的函數 increase -->
  <p>{{ count }}</p>
</div>
```

### Computed

將data部分的資料先經過邏輯運算處理，只有相關的資料有變動才重新計算

```javascript
new Vue({
  el:"#app",
  data:{
    message:"!olleH"
  },
  computed:{
    reverseMessage:function(){
      return this.message.split("").reverse().join("");
    }
  }
});
```

```html
<div id="app">
  <p>{{ reverseMessage }}</p> <!-- Hello! -->
</div>
```

### Watch

監控的數值有更動的時候就會執行

```javascript
new Vue({
  el:"#app",
  data:{
    count:0
  },
  watch:{
    count: function(nowCountValue){   //名稱需與watch的數值一致
      console.log(nowCountValue);     //改變後的資料數值
    }
  }
});
```

```html
<div id="app">
  <div v-on:click="count++">Increase</div> <!-- 每次按下點擊改變 count 的時候就會輸出一次 "Count"-->
  <p>{{ count }}</p> <!-- 1 --> 
</div>
```

### Filters

```
//待補充
```

## Two way data binding (v-model)

```javascript
new Vue({
  el:"#app",
  data:{
    name:"Name"     
  }
});
```

```html
<!-- 1 -->
<div id="app">
  <input type="text" v-model="name"> <!-- 輸入的欄位內容改變 同時會改變date中name得值也會改變下方顯示的內容 -->
  <p>{{ name }}</p>
</div>
```

## Condition (v-if、v-else、v-else-if)

在HTML tag 上加入 v-if 內容為一個條件，若條件為true則顯示若為false則不顯示

```javascript
new Vue({
  el:"#app",
  data:{
    show:true  
  }
});
```

```html
<div id="app">
  <p v-if="show">See</p>
  <p v-else>Cant see</p>
  <div v-on:click="show=!show">Hide</div>
</div>
```

也可以使用else if

```javascript
new Vue({
  el:"#app",
  data:{
    show:1  
  }
});
```

```html
<div id="app">
  <p v-if="show==1">One</p>
  <p v-else-if="show==2">Two</p>
  <p v-else>Three</p>
  <input type="text" v-model="show">
</div>
```

## Loop (v-for)

使用 v-for 可以將 data 中的資料用迴圈做處理

```javascript
new Vue({
  el:"#app",
  data:{
    todos:[{
      'id':1,
      'content':'some thing',
      'done': true
    },{
      'id':2,
      'content':'some thing2',
      'done': false
    }]  
  }
});
```

```html
<div id="app">
  <template v-for='(todo, index) in todos'>
    <p v-if="todo.done == false">{{ todo.id }} {{ todo.content }}</p> <!-- 將 todolist 中未完成的事項列出來 -->
  </template>
</div>
```

## Bind (v-bind)

```
待補充
```

## Dynamic CSS

### By object

透過v-bind綁定class，內容為一個object，key為class的名稱，value則為true或false，若為true則為幫DOM新增該class，若為false則從DOM移除該class

```javascript
new Vue({
  el:"#app",
  data:{
    isRed:false  
  }
});
```

```html
<div id="app">
  <div class="demo" v-on:click="isRed = !isRed" v-bind:class="{ redBg : isRed }"></div>
</div>
```

```css
.demo{
  width:100px;
  height:100px;
  background:gray;
}
.redBg{
  background:red;
}
```

或是透過computed return一個object，如下：

```javascript
new Vue({
  el:"#app",
  data:{
    isRed:false  
  },
  computed:{
    divClass:function() {
      return {
        redBg : this.isRed
      }
    }
  }
});
```

```html
<div id="app">
  <div class="demo" v-on:click="isRed = !isRed" v-bind:class="divClass"></div>
</div>
```

```css
.demo{
  width:100px;
  height:100px;
  background:gray;
}
.redBg{
  background:red;
}
```

### Without class

直接綁定style property

```javascript
new Vue({
  el:"#app",
  data:{
    isRed:false  
  },
  computed:{
    myClass:function() {
      return {
        'background' : 'red'
      }
    }
  }
});
```

```html
<div id="app">
  <div class="demo" v-bind:style="myClass"></div>
  <!-- style="background:red" -->
</div>
```

```css
.demo{
  width:100px;
  height:100px;
  background:gray;
}
```


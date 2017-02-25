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
  computed:{   //類似method，用於將data部分的資料先經過邏輯運算處理，只有相關的資料有變動到才執行
  },
  watch:{    //監控data中的資料變化，並做出後續的動作
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

若是data包含HTML tag的內容要使用v-html，如下：

```javascript
new Vue({
  el:"#app",
  data:{
    link:"<a href='http://google.com'>Google</a>"    
  }
});
```

```html
<div id="app">
  <p v-html="link"></p> <!-- Show an a tag -->
</div>
```

### Method

這個區塊能使用的一些function，不管有沒有相關的資料變動，每次重新渲染都會執行一次，

```javascript
new Vue({
  el:"#app",
  data:{
  },
  methods:{    
    sayHello: function(){
      return "Hello";
    }
  }
});
```

```html
<div id="app">
  <p>{{ sayHello() }}</p> <!-- Hello -->
</div>
```

### Computed

類似method，用於將data部分的資料先經過邏輯運算處理，只有相關的資料有變動到才執行

```javascript
new Vue({
  el:"#app",
  data:{
    count:0
  },
  computed:{
    plusCount:function(){
      return this.count+=1;
    }
  }
});
```

```html
<div id="app">
  <p>{{ plusCount }}</p> <!-- 1 -->
</div>
```

### Watch

watch的數值有更動的時候就會執行

```javascript
new Vue({
  el:"#app",
  data:{
    count:0
  },
  watch:{
    count:function(){   //名稱需與watch的數值一致
      console.log("Count");
    }
  }
});
```

```html
<div id="app">
  <div v-on:click="count++">Increase</div>
  <p>{{ count }}</p> <!-- 1 -->
</div>
```

## Event listening

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

## Model

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
  <input type="text" v-model="name"> <!-- 輸入的欄位內容改變 同時也會改變下方的name的值 -->
  <p>{{ name }}</p>
</div>
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
  <!-- style="background=red" -->
</div>
```

```css
.demo{
  width:100px;
  height:100px;
  background:gray;
}
```

## Condition

### v-if、v-else、v-else-if

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
  <p v-else-id="show==2">Two</p>
  <p v-else>Three</p>
  <input type="text" v-model="show">
</div>
```

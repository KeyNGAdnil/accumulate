# this指向

### 前提：

this的指向不是在编写时确定的,而是在执行时确定的，同时，this不同的指向在于遵循了一定的规则。

#### 优先级

**new** > **显式** > **隐式** > **默认**

#### 1.默认情况

在默认情况下，this指向的是全局对象，比如对于浏览器就是window对象，严格模式下指向undefined。

```javascript
name = "Bale";

function sayName () {
    console.log(this.name);
};

sayName(); //"Bale"
```

#### 2.隐式绑定

如果函数被调用的位置存在上下文对象时，那么函数是被隐式绑定的。	

```javascript
function f() {
    console.log( this.name );
}
var name = 'C'
var obj = {
    name: "Messi",
    f: f
};

obj.f(); //被调用的位置恰好被对象obj拥有，因此结果是Messi
let a = obj.f;
a();//这种情况其实是隐式绑定被解除，变成了全局调用,结果是C
```

#### 3.显式绑定（call/apply/bind）

##### **3.1** call/apply可以将 **this** 显式地指向到某一个对象上。

```javascript
var person = {
  name: "axuebin",
  age: 25
};
function say(job){
  console.log(this.name+":"+this.age+" "+job);
}
say.call(person,"FE"); // axuebin:25 FE
say.apply(person,["FE"]); // axuebin:25 FE
```

如果传入一个原始值（字符串、布尔或数字类型）来当做`this`的绑定对象， 这个原始值会被转换成它的对象形式（`new String()`），这通常被称为“装箱”。

`call`和`apply`从`this`的绑定角度上来说是一样的，唯一不同的是它们的第二个参数。

##### **3.2** bind

```javascript
function f() {
    console.log( this.name );
}
var obj = {
    name: "Messi",
};

var obj1 = {
     name: "Bale"
};

f.bind(obj)(); //Messi ,由于bind将obj绑定到f函数上后返回一个新函数,因此需要再在后面加上括号进行执行,这是bind与apply和call的区别
```

**区别**：bind体现了预处理思想：事先把fn的this改变为我们想要的结果，并且把对应的参数值也准备好，以后要用到了，直接的执行即可。

call和apply直接执行函数，而bind需要再一次调用。

#### 4.new构造函数

用 new 调用一个构造函数，会创建一个新对象, 在创造这个新对象的过程中,新对象会自动绑定到Person对象的this上，那么 this 自然就指向这个新对象。

```javascript
function Person(name) {
  this.name = name;
  console.log(name);
}

var person1 = new Person('Messi'); //Messi  此时构造函数中的this指向实例对象。
```

#### 5.箭头函数

箭头函数没有this, 因此也不能绑定。里面的this会指向当前最近的非箭头函数的this，找不到就是window(严格模式是undefined)。

箭头函数的this不是调用的时候决定的，而是在定义的时候处在的对象就是它的this。

```javascript
// ES6
const obj = {
    getArrow() {
        return () => {
            console.log(this === obj);
        };
    }
} 

// ES5，由 Babel 转译
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function () {
            console.log(_this === obj);
        };
    }
};
obj.getArrow()//true
```

箭头函数的this看外层的是否有函数，如果有，外层函数的this就是内部箭头函数的this，如果没有，则this是window。

#### 6.DOM事件

`this`指向触发事件的元素，也就是始事件处理程序所绑定到的DOM节点。

```javascript
var ele = document.getElementById("id");
ele.addEventListener("click",function(e){
  console.log(this);
  console.log(this === e.target); // true
})
```


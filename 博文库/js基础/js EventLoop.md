# JavaScript的事件循环机制

### 1.事件循环

**背景**：JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。为了协调事件、用户交互、脚本、UI 渲染和网络处理等行为，防止主线程的不阻塞，Event Loop 的方案应用而生。

**概念**：它是一个在JavaScript引擎等待任务、执行任务和进入休眠状态和进入休眠状态等待更多任务状态之间转换的无限循环。

### 2.运行流程

![事件运行流程](https://user-gold-cdn.xitu.io/2019/10/17/16dd55ca2fd82de5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在执行代码过程中，如果遇到一些**异步代码**(比如setTimeout,ajax,promise.then以及用户点击等操作),那么浏览器就会将这些代码放到另一个线程(在这里我们叫做幕后线程)中去执行，**在前端由浏览器底层执行，在 node 端由 libuv 执行**，这个线程的执行不阻塞主线程的执行，主线程继续执行栈中剩余的代码。

当**幕后线程**（background thread）里的代码执行完成后(比如setTimeout时间到了，ajax请求得到响应),该线程就会将它的回调函数放到任务队列（又称作事件队列、消息队列）中等待执行。而当主线程执行完栈中的所有代码后，它就会检查任务队列是否有任务要执行，如果有任务要执行的话，那么就将该任务放到执行栈中执行。如果当前任务队列为空的话，它就会一直循环等待任务到来。因此，这叫做**事件循环**。

**两个细节**：

1. 引擎执行任务时永远不会进行渲染（render）。如果任务执行需要很长一段时间也没关系。仅在任务完成后才会绘制对 DOM 的更改。
2. 如果一项任务执行花费的时间过长，浏览器将无法执行其他任务，无法处理用户事件，因此，在一定时间后浏览器会在整个页面抛出一个如“页面未响应”之类的警报，建议你终止这个任务。这种情况常发生在有大量复杂的计算或导致死循环的程序错误时。

### 3.任务队列

从上图中可以看出JavaScript是有两个任务队列的，一个叫做 Macrotask Queue(Task Queue) 大任务, 一个叫做 Microtask Queue 小任务，也就是常说的宏任务和微任务。

**Macrotask（宏任务）** 常见的任务：

- setTimeout
- setInterval
- setImmediate
- I/O
- 用户交互操作，UI渲染

**Microtask（微任务）** 常见的任务：

- Promise(重点)
- process.nextTick(nodejs)
- Object.observe(不推荐使用)

**两者之间的执行顺序**：

1. 检查**宏任务**队列是否为空,若不为空，则进行下一步，若为空，则跳到3
2. 从**宏任务**队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步
3. 检查**微任务**队列是否为空，若不为空，则进入下一步，否则，跳到1（开始新的事件循环）
4. 从**微任务**队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到3 其中，在执行代码过程中新增的**微任务**会在当前事件循环周期内执行，而新增的**微任务**只能等到下一个事件循环才能执行了

**总之**：一次事件循环只执行处于 Macrotask 队首的任务，执行完成后，立即执行 Microtask 队列中的所有任务。

![](https://segmentfault.com/img/bVbpsFp?w=392&h=740)

### 4.示例解释

```javascript
 console.log(1)
setTimeout(function() {
  //settimeout1
  console.log(2)
}, 0);
const intervalId = setInterval(function() {
  //setinterval1
  console.log(3)
}, 0)
setTimeout(function() {
  //settimeout2
  console.log(10)
  new Promise(function(resolve) {
    //promise1
    console.log(11)
    resolve()
  })
  .then(function() {
    console.log(12)
  })
  .then(function() {
    console.log(13)
    clearInterval(intervalId)
  })
}, 0);

//promise2
Promise.resolve()
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
console.log(9)
```

- **第一次事件循环:**

1. console.log(1)被执行，输出1
2. settimeout1执行，加入macrotask队列
3. setinterval1执行，加入macrotask队列
4. settimeout2执行，加入macrotask队列
5. promise2执行，它的两个then函数加入microtask队列
6. console.log(9)执行，输出9
7. 根据事件循环的定义，接下来会执行新增的microtask任务，按照进入队列的顺序，执行console.log(7)和console.log(8),输出7和8 microtask队列为空，回到第一步，进入下一个事件循环，此时macrotask队列为: settimeout1,setinterval1,settimeout2

- **第二次事件循环:**

从macrotask队列里取位于队首的任务(settimeout1)并执行，输出2 microtask队列为空，回到第一步，进入下一个事件循环，此时macrotask队列为: setinterval1,settimeout2

- **第三次事件循环:**

从macrotask队列里取位于队首的任务(setinterval1)并执行，输出3,然后又将新生成的setinterval1加入macrotask队列 microtask队列为空，回到第一步，进入下一个事件循环，此时macrotask队列为: settimeout2,setinterval1

- **第四次事件循环:**

从macrotask队列里取位于队首的任务(settimeout2)并执行,输出10，并且执行new Promise内的函数(new Promise内的函数是同步操作，并不是异步操作),输出11，并且将它的两个then函数加入microtask队列 从microtask队列中，取队首的任务执行，直到为空为止。因此，两个新增的microtask任务按顺序执行，输出12和13，并且将setinterval1清空。

### 5.任务轮询

通过setTimeout的方式递归调用run函数进行i的自增。每次自增都会在宏任务的队列中进行。

```javascript
function handle() {
    let i = 0;
    (function run() {
        hd.innerHTML = i;
        hd.style.width = i + "%"
        if (++i <= 100) {
            setTimeout(run, 20);
        }
    })()
}
handle();
```



### 6.任务拆分成多个子任务

通过委托宏任务的队列的方式可以进行切片式的处理一个累加巨大数字的问题，这样的方式可以比直接在同步队列处理更快，防止了浏览器线程阻塞。

```javascript
let num = 987654321;
let count = 0;
function countSum() {
    for (let i = 0; i < 100000000; i++) {
        if (num <= 0) break;
        count += num--;
    }
    if (num > 0) {
        console.log(num);
        setTimeout(countSum);
    } else {
        console.log("总计：" + count);
    }
}
countSum();
```



**参考**

[js中的宏任务和微任务](https://segmentfault.com/a/1190000020225668)

[面试一定会问到的-js事件循环](https://juejin.im/post/6844903968292749319)

[现代JavaScript教程-事件循环](https://zh.javascript.info/event-loop)




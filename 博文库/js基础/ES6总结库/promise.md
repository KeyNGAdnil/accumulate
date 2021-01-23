# Promise

**结合 [Promise/A+](https://promisesaplus.com/) 规范，我们可以分析出 Promise 的基本特征：**

```js
promise 有三个状态：`pending`，`fulfilled`，or `rejected`；「规范 Promise/A+ 2.1」

`new promise`时， 需要传递一个`executor()`执行器，执行器立即执行；

`executor`接受两个参数，分别是`resolve`和`reject`；

promise  的默认状态是 `pending`；

promise 有一个`value`保存成功状态的值，可以是`undefined/thenable/promise`；「规范 Promise/A+ 1.3」

promise 有一个`reason`保存失败状态的值；「规范 Promise/A+ 1.5」

promise 只能从`pending`到`rejected`, 或者从`pending`到`fulfilled`，状态一旦确认，就不会再改变；

promise 必须有一个`then`方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」

如果调用 then 时，promise 已经成功，则执行`onFulfilled`，参数是`promise`的`value`；

如果调用 then 时，promise 已经失败，那么执行`onRejected`, 参数是`promise`的`reason`；

如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调`onRejected`；
```

### 1.基础版

```js
const PENDING = 'pending';
const FULFILED = 'fulfiled';
const REJECTED = 'rejected';

class Mypromise {
    //初始化
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        let resolve = (value) => {
            if (status === PENDING) {
                this.status === FULFILED;
                this.value = value;
            }
        }
        let rejected = (reason) => {
            if (status === PENDING) {
                this.status === REJECTED;
                this.reason = reason;
            }
        }
        try {
            executor(resolve, rejected)
        } catch (error) {
            rejected(error)
        }
    }
    //then方法
    then(onFulfiled, onRejected) {
        if (this.status === FULFILED) {
            onFulfiled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}

const promise = new Mypromise((resolve, reject) => {
  resolve('成功');
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)//"success 成功"
```

现在我们已经实现了一个基础版的 Promise，但是还不要高兴的太早噢，这里我们只处理了同步操作的 promise。如果在 `executor()`中传入一个异步操作,就无法得到返回。

现在我们来优化下。

```js
const PENDING = 'pending';
const FULFILED = 'fulfiled';
const REJECTED = 'rejected';

class Mypromise {
    //初始化
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (status === PENDING) {
                this.status === FULFILED;
                this.value = value;
                this.onResolvedCallbacks = foreach(fn => fn())
            }
        }
        let rejected = (reason) => {
            if (status === PENDING) {
                this.status === REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks = foreach(fn => fn())
            }
        }
        try {
            executor(resolve, rejected)
        } catch (error) {
            rejected(error)
        }
    }
    //then方法
    then(onFulfiled, onRejected) {
        if (this.status === FULFILED) {
            onFulfiled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfiled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onFulfiled(this.reason)
            })
        }
    }
}
```

### 2.then方法的链式调用和值穿透

```js
then 的参数 onFulfilled 和 onRejected 可以缺省，如果 onFulfilled 或者 onRejected不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
```

### 3.resolve()

```js
Promise.resolve = (param) => {
    if (param instanceof Promise) return param;
    return new Promise((resolve, reject) => {
        if (param && param.then && typeof param.then === 'function') {
            // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
            param.then(resolve, reject);
        } else {
            resolve(param);
        }
    })
}
```

### 4.reject()

```js
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```

### 5.finally()

```js
Promise.prototype.finally = function (callback) {
    this.then(value => {
        return Promise.resolve(callback()).then(() => {
            return value;
        })
    }, error => {
        return Promise.resolve(callback()).then(() => {
            throw error;
        })
    })
}
```

### 6.all()

```js
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let len = promises.length;
        if (len === 0) {
            resolve(result);
            return;
        }
        const handleData = (data, index) => {
            result[index] = data;
            // 最后一个 promise 执行完
            if (index == len - 1) resolve(result);
        }
        for (let i = 0; i < len; i++) {
            // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
            Promise.resolve(promise[i]).then(data => {
                handleData(data, i);
            }).catch(err => {
                reject(err);
            })
        }
    })
}
```

### 7.race()

```js
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        if (len === 0) return;
        for (let i = 0; i < len; i++) {
            Promise.resolve(promise[i]).then(data => {
                resolve(data);
                return;
            }).catch(err => {
                reject(err);
                return;
            })
        }
    })
}
```




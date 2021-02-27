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
//resolve
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
//reject
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
//finally
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
//all
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
//race
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
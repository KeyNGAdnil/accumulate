function foo() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function () {
            return i
        }
    }
    return arr;
}
var bar = foo()
console.log(bar[0]());//10
//结果是：10

function foo() {
    var arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = function () {
            return i
        }
    }
    return arr;
}
var bar = foo()
console.log(bar[0]());//0

function foo() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = (function (n) {
            return function(){
                return n
            }
        })(i)
    }
    return arr;
}
var bar = foo()
console.log(bar[0]());//0

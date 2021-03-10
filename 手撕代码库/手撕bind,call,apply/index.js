/**
 * 1.bind函数实现
*/
Function.prototype.mybind = function (obj, ...args) {
    return (...newArgs) => this.apply(obj, [...args, ...newArgs])
}
// test
const test = {
    name: "fy",
    showName: function (last) {
        console.log(this.name + " is " + last);
    },
};
test.showName("handsome"); // fy is handsome
test.showName.bind({ name: "Mr.fy" })("handsome");
test.showName.mybind({ name: "Mr.fy" })("handsome");


/**
 * 2.call函数实现
*/
Function.prototype.mycall = function (obj, ...args) {
    obj.fn = this;
    var result = obj.fn(...args);
    delete obj.fn
    return result;
}
// test
let obj = {
    name: 'jack'
}
function test(arg1, arg2, arg3) {
    console.log(this.name)   // jack
    console.log(arg1, arg2, arg3);  // 1 2 3
}
test.mycall(obj, 1, 2, 3);

/**
 * 3.apply函数实现
*/
Function.prototype.myapply = function (obj, args = []) {
    if (args && !Array.isArray(args)) {
        throw ('Uncaught TypeError: CreateListFromArrayLike called on non-object')
    }
    obj.fn = this;
    let result = obj.fn(...args)
    delete obj.fn;
    return result;
}
// test
let obj = {
    name: 'jack'
}
function test(arg1, arg2, arg3) {
    console.log(this.name)   // jack
    console.log(arg1, arg2, arg3);  // 1 2 3
}
test.myapply(obj, [1, 2, 3]);
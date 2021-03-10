function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;

    proto = Object.getPrototypeOf(left);

    while (true) {
        if (proto == null) return false;

        if (proto == right.prototype) return true;

        proto = Object.getPrototypeOf(proto)
    }
}
// console.log(myInstanceof("111", String)); //false
// console.log(myInstanceof(new String("111"), String));//true

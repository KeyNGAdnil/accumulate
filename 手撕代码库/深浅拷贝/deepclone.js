function deepClone(obj) {
    //判断是对象还是数组
    let copy = obj instanceof Array ? [] : {};
    for (let key in obj) {
        //判断是否是对象上的属性，而不是原型上的属性
        if (obj.hasOwnProperty(key)) {
            copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return copy;
}

// test
console.log(deepClone({ name: 'jack', birth: { year: '1997', month: '10' } }))
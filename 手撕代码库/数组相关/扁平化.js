let a = [4, 1, 2, 3, 6, [7, 8, [3, 9, 10, [4, 6, 11]]]];

/**
 * 1.join和split
 */

let b = a.join(',').split(',').map(Number)
// console.log(b)

/**
 * 2.函数递归
 */

let d = [];
let fn = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            fn(arr[i]);
        } else {
            d.push(arr[i]);
        }
    }
}
fn(a)
// console.log(d)

/**
 * 3.reduce
 */

function flatten(arr) {
    return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, [])
}

console.log(flatten(a))
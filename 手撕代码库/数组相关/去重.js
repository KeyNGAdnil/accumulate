let arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
/**
 * 1.循环遍历截取
 */

function rep(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--
            }
        }
    }
    return arr;
}

// let arr2 = rep(arr)
// console.log(arr, arr2)

/**
 * 2.indexOf()
 */

function rep2(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) !== i) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}
// let arr3 = rep2(arr)
// console.log(arr, arr3)

/**
 * 3.利用hashmap记录和放入新数组
 */

let map = {}
let newarr = []
for (var i = 0; i < arr.length; i++) {
    var k = arr[i];
    if (!map[k]) {
        map[k] = true;
        newarr.push(k)
    }
}
// console.log(newarr)

/**
 * 4.filter()
 */

let filarr = arr.filter(function (e, index, array) {
    return array.indexOf(e) === index;
});
// console.log(filarr)

/**
 * 5.include()
 */

function rep4(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) res.push(arr[i]);
    }
    return res;
}
// console.log(rep4(arr))

/**
 * set方法
 */

let setarr = new Set(arr)
console.log(Array.from(setarr))
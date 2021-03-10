function func1(cb) {
    setTimeout(function () {
        console.log('func1')
        cb()
    }, 3000)
}
function func2(cb) {
    setTimeout(function () {
        console.log('func2')
        cb()
    }, 1000)
}
function func3(cb) {
    setTimeout(function () {
        console.log('func3')
        cb()
    }, 2000)
}


// function euque(list) {
//     let p = new Promise(list[0]).then((res) => {
//         return new Promise(list[1]);
//     }).then(() => {
//         return new Promise(list[2])
//     })
// }
euque([func1, func2, func3])
/**
 * 2.async方法 
 */
async function euque(list) {
    for (let fn of list) {
        let res = await new Promise(fn);
        // fn();
    }
}
//不稳定 O(nlogn)
const arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

function quick(arr) {
    if (arr.length <= 1) return arr;

    let temp = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > temp) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quick(left).concat([temp], quick(right));
}

console.log(quick(arr))
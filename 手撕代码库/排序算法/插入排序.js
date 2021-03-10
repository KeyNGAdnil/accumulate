// //稳定 O(n^2)
const arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

function insert(arr) {
    for (let i = 0; i < arr.length; i++) {
        let temp = i;
        for (let j = i - 1; j >= 0; j--) {
            if (arr[temp] < arr[j]) {
                [arr[temp], arr[j]] = [arr[j], arr[temp]];
                temp = j;
            } else {
                break;
            }
        }
    }
    return arr;
}

console.log(insert(arr))


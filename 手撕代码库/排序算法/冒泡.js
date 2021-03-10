//稳定 O(N2)
const arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

function bubble(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let flag = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        if (!flag) {
            break;
        }
    }
    return arr;
}

console.log(bubble(arr));
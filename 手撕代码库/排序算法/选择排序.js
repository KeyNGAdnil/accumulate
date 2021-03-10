//不稳定 O(N2)
const arr = [1, 20, 10, 30, 22, 11, 55, 24, 31, 88, 12, 100, 50];

function selection(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let index = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[index] > arr[j]) {
                index = j;
            }
        }
        [arr[index], arr[i]] = [arr[i], arr[index]];
    }
    return arr;
}
console.log(selection(arr))
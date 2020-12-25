# hashMap

#### [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

```javascript
var twoSum = function (nums, target) {
    const hashMap = {};

    for (let i = 0; i < nums.length; i++) {
        let cur = nums[i];
        let targetKey = target - cur;
        if (hashMap[targetKey] !== undefined) {
            return [hashMap[targetKey], i]
        } else {
            hashMap[cur] = i;
        }
    }
    
};
```

#### [2. 三数之和](https://leetcode-cn.com/problems/3sum/)

```javascript
var threeSum = function (nums) {
    if (nums == [] || nums.length < 3) return [];

    nums.sort(function (a, b) {
        return a - b;
    })
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        let L = i + 1;
        let R = nums.length - 1;
        while (L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if (sum == 0) {
                res.push([nums[i], nums[L], nums[R]])
                while (L < R && nums[L] == nums[L + 1]) L++;
                while (L < R && nums[R] == nums[R - 1]) R--;
                L++;
                R--;
            } else if (sum > 0) R--;
            else if (sum < 0) L++;
        }
    }
    return Array.from(new Set(res));
};
```


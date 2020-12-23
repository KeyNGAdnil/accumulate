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


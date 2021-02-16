# bytedance题库

#### [1. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

```js
var reverseList = function (head) {
    let pre = null;
    let cur = head;
    let next = null;

    while (cur) {
        next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
};
```

#### [2. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

```js
var hasCycle = function (head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true;
        }
    }
    return false;
};
```

#### [3.二叉树先序、中序和后序遍历](https://www.nowcoder.com/practice/a9fec6c46a684ad5a3abd4e365a9d362?tpId=117&tqId=37819&companyId=665&rp=1&ru=%2Fcompany%2Fhome%2Fcode%2F665&qru=%2Fta%2Fjob-code-high%2Fquestion-ranking&tab=answerKey)

```js
function threeOrders( root ) {
    // write code here
    if(!root){
        return [];
    }
    return [pre(root),mid(root),las(root)]
}
function pre(root,res = []){
    if(root){
        res.push(root.val);
        pre(root.left,res);
        pre(root.right,res);
    }
    return res;
}
function mid(root,res = []){
    if(root){
        mid(root.left,res);
        res.push(root.val);
        mid(root.right,res);
    }
    return res;
}
function las(root,res = []){
    if(root){
        las(root.left,res);
        las(root.right,res);
        res.push(root.val);
    }
    return res;
}
```

#### [4.LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/)

```

```

#### [5. 二分查找](https://leetcode-cn.com/problems/binary-search/)

```js
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1
        }
    }
    return -1;
};
```




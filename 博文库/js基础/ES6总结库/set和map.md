# Set和Map

## Map

Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

### 创建

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.get('name') // "张三"
map.get('title') // "Author"

typeof map;                          // "object"
map instanceof Object;               // true
Object.prototype.toString.call(map); // "[object Map]"
复制代码
```

### 属性

- `Map.prototype.size`: Map 结构的成员总数

### 方法

`Map` 的方法都是继承于原型，`Map.prototype.set(key, value)`。

操作方法：

- `set(key, value)` ：设置键值名，返回整个 Map 结构
- `get(key)`: 读取key对应的键值，如果找不到key，返回undefined
- `has(key)`: 表示某个键是否在当前 Map 对象之中
- `delete(key)`: 成功删除某个键，返回true，否则返回 false
- `clear()`: 清除所有成员，没有返回值

遍历方法：

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

### 转换为数组

使用扩展运算符（`...`），可以将 Map 结构转换为数组结构

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
复制代码
```

除了转换为数组，也可以跟其他数据结构互相转换，如

- Map 转为对象，对象转 Map
- Map 转为 JSON， JSON 转 Map

### 使用场景

1. key 值不一定是字符串时
2. 需要查找一个二维数组的数据时
3. 需要转换一个二维数组时

## WeakMap

### 与Map的区别

WeakMap 与 Map 的区别:

1. WeakMap 只接受对象作为键名（null除外），不接受其他类型的值作为键名
2. WeakMap的键名所指向的对象，不计入垃圾回收机制
3. WeakMap 没有遍历操作

### 创建

```js
const wm = new WeakMap();
const key = {foo: 1};
wm.set(key, 2);
复制代码
```

### 可用方法

`get()`、`set()`、`has()`、`delete()`

### 使用场景

#### 1. 避免内存泄露

常用于以Dom节点作为键名。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
复制代码
```

#### 2. 部署私有属性

作为私有属性，如果删除实例，它们也就随之消失，不会造成内存泄漏。

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

## Set

`Set` 类似于数组，但是成员的值都是唯一的，没有重复的值。

### 创建

```js
var s = new Set();
s.add('haha');
s.size; // 1

typeof s;                          // "object"
s instanceof Object;               // true
Object.prototype.toString.call(s); // "[object Set]"
复制代码
```

### 属性

- `Set.prototype.constructor`：构造函数，默认就是Set函数。
- `Set.prototype.size`：返回Set实例的成员总数。

### 方法

`Set` 的方法都是继承于原型，`Set.prototype.add(value)`。

操作方法：

- `add(value)`：添加某个值，返回 Set 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
- `clear()`：清除所有成员，没有返回值。

遍历方法：

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器（键名、键值相同）
- `forEach()`：使用回调函数遍历每个成员，但没有返回值

### 转换为数组

`Array.from`方法可以将`Set`结构转为数组。

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
复制代码
```

### 使用场景

#### 1. 数组去重

`Set` 结构可以接受一个数组作为入参，这就提供了一种数组去重的方法

```js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
复制代码
```

也可以使用`...` 实现去重

```js
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
复制代码
```

#### 2. 取并集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
复制代码
```

#### 3. 取交集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}
复制代码
```

#### 4. 取差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
复制代码
```

## WeakSet

### 与Set的区别

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有几个区别：

1. WeakSet 的成员只能是对象，而不能是其他类型的值
2. WeakSet 中的对象都是弱引用，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
3. WeakSet 没有 size 属性，也无法使用 遍历操作

### 创建

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

Object.prototype.toString.call(ws) // "[object WeakMap]"
复制代码
```

### 可用方法

`add()`、`delete()`、`has()`

### 使用场景

#### 1. 避免内存泄露

由于 WeakSet 不再使用的时候，会被自动回收，所以可以用来存储 DOM 节点，而不用担心这些节点从文档移除时会引发内存泄露。

```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
复制代码
```

上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。
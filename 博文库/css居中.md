# CSS居中方案

### 一.水平居中

#### 1.行内元素

​	text-align: center

#### 2.块级元素

- 宽度确定
  - margin: 0 auto;
  - 在父元素为position: relative下
    子元素：通过绝对定位和margin-left: -width/2
- 未知宽度
  - display: table;margin: 0 auto;
  - display: inline-block;text-align: center
  - display: flex;justify-content: center
  - 绝对定位+transform，translateX可以移动本身元素的50%。

### 二.垂直居中

1. 利用`line-height`实现居中，这种方法适合纯文字类
2. 通过设置父容器 `相对定位`，子级设置 `绝对定位`，标签通过margin实现自适应居中
3. 弹性布局 `flex`:父级设置display: flex; 子级设置margin为auto实现自适应居中
4. 父级设置相对定位，子级设置绝对定位，并且通过位移 `transform`实现
5. `table` 布局，父级通过转换成表格形式，然后子级设置 `vertical-align` 实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。
6. flex方案: `align-items: center`;
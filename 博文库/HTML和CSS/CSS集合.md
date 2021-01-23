# CSS集合

#### 1.CSS选择符

```css
·id选择器（#myId）
·类选择器（.myClassName）
·标签选择器（div, h1, p）
·后代选择器（h1 p）
·相邻后代选择器（子）选择器（ul > li）
·兄弟选择器（li~a）
·相邻兄弟选择器（li+a）
·属性选择器（a[rel="external"]）
·伪类选择器（a:hover, li:nth-child）
·伪元素选择器（::before, ::after）
·通配符选择器（*）
```

#### 2.::before 和 :after 中双冒号和单冒号的区别？这2个伪元素的作用？

```css
·在 CSS3 中 : 表示伪类， :: 表示伪元素
·想让插入的内容出现在其他内容前，使用::befroe。否则，使用::after

其中伪类和伪元素的根本区别在于：它们是否创造了新的元素,,   这个新创造的元素就叫  "伪无素" 。

伪元素/伪对象：不存在在DOM文档中，是虚拟的元素，是创建新元素。 这个新元素(伪元素)  是某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中.

伪类：存在DOM文档中，(无标签,找不到,  只有符合触发条件时才能看到 ),  逻辑上存在但在文档树中却无须标识的“幽灵”分类。
```

#### 3.用纯 CSS 创建一个三角形？

```css
/* 
  采用的是相邻边框链接处的均分原理
  将元素的宽高设为0，只设置 border ,
  将任意三条边隐藏掉（颜色设为 transparent ）,剩下的就是一个三角形
 */
#demo{
  width: 0;
  height: 0;
  border-width: 20px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```
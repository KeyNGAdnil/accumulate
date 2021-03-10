# Flex布局

## **一. 为什么要学这个布局？**

css3中的flexbox生来就是为了布局而生的，使用它能使许多布局布局变得简单。典型的三栏式布局、垂直水平居中布局，使用的是传统的浮动法、定位法，代码相对复杂难懂，如果使用flexbox就会变得很简单。

而且这个布局也是当下前端开发人员必备的技能，可以说是不得不学。

## **二. 将一个元素变成Flexbox**

定义容器的语法：display : flex || inline-flex

定义了容器后该伸缩容器中的元素将变成伸缩项，并且该容器将生成两条轴：主轴和侧轴。

![img](https://pic1.zhimg.com/80/v2-c022f4b77422c04501e0d148cba54bc0_720w.jpg)容器与子项

![img](https://pic3.zhimg.com/80/v2-81f40c95b4ec063dec9f6843a70fe506_720w.jpg)主轴与侧轴

## **三. 常用的容器属性**

**第一组：**

- **flex-direction**：改变主轴方向

```css
flex-direction: row(默认,从左到右) | row-reverse(从右到左) | column(从上到下) | column-reverse(从下到上)
```

- **flex-wrap**：自动换行和改变侧轴方向

```css
flex-wrap: nowrap(默认,不换行) | wrap(换行) | wrap-reverse(换行且改变侧轴方向)
```

- **flex-flow**：前两者的缩写

```css
flex-flow: <flex-direction> || <flex-wrap>
```

**第二组：**

- **justify-content**：控制子项在主轴的对齐方式

```css
justify-content: flex-start(默认,起点对齐) | flex-end(终点对齐) | center(居中) | space-between(两端对齐) | space-around(平均分配)
```

- **align-items**：控制子项在侧轴的对齐方式

```css
align-items: flex-start(起点对齐) | flex-end(终点对齐) | center(居中) | stretch(默认值,未设置高度就铺满侧轴)|baseline(项目的第一行文字的基线对齐)
```

- **align-content**：控制子项所组成的行(列)在侧轴的对齐方式

```css
属性同 justify-content 几乎一致
flex-start | flex-end | center | space-between | space-around | stretch;
属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
```

## **四. 常用的项目(子项)属性**

**第一组：**

- **order**：用来改变子项位置

```css
order: 0(默认值为0,值越大位置越靠后)
```

**第二组：**

- **align-self**：控制单个子项在侧轴的对齐方式

```css
属性同 align-items 几乎一致
```

**第三组：**

- **flex-grow**：子项的伸展比例

```css
flex-grow: <number>; // 默认为0，即如果存在剩余空间，也不放大。
```

- **flex-shrink**：子项的收缩比例

```css
flex-shrink: <number>; // 默认为1，即如果空间不足，该子项将缩小。
```

- **flex-basis**：定义子项的伸缩前的长度(和使用width差不多)

```css
flex-basis: auto; // 默认值为auto，即原本的大小
```

- **flex**：前三者的缩写形式(后两个属性可选)

```css
flex: 0 1 auto; // 默认值 0 1 auto
```
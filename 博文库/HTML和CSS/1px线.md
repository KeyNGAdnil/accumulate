# 1px实现

网上其实有很多关于1px的实现方法拉。其实关于1px的实现我之前有在实习的时候项目中使用过，但是一直没有对移动端1px的实现做一个小总结。今天呢，就来稍微总结一下吧，给自己做一个备忘录的同时也希望能够给予知友的帮助。

- 1px实现的难点

- 1px实现方案

- - height: 0.5px
  - scale
  - linear-gradient
  - box-shadow
  - svg
  - viewport

## **1px实现的难点**

我们知道，像素可以分为物理像素（CSS像素）和设备像素。由于现在手机大部分是Retina高清屏幕，所以在PC端和移动端存在设备像素比的概念。简单说就是你在pc端看到的1px和在移动端看到的1px是不一样的。

在PC端上，像素可以称为CSS像素，PC端上dpr为1。也就说你书写css样式是是多少在pc上就显示多少。而在移动端上，像素通常使用设备像素。往往PC端和移动端上在不做处理的情况下1px显示是不同的。

一个物理像素等于多少个设备像素取决于移动设备的屏幕特性(是否是Retina)和用户缩放比例。

如果是Retina高清屏幕，那么dpr的值可能为2或者3，那么当你在pc端上看到的1px时，在移动端上看到的就会是2px或者3px。

由于业务需求，我们需要一些方法来实现移动端上的1px。

## **1px实现方法**

## **0.5px**

```css
.px05 {
    border-bottom: 0.5px solid #000;
    // height: 0.5px;
    // background-color: #000;
}
```

![img](https://pic4.zhimg.com/80/v2-3a1f04c2d086de03d7c30693eaac6d27_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-f9bb9393f56686bb39b6e818f0c4c1ea_720w.jpg)

可以看到chrome和firefox都会把`0.5px`转换为`1px`。目前看来`0.5px`的方法暂时不行。未来希望可以实现吧。

## **scale**

如果在一个元素上使用`scale`时会导致整个元素同时缩放，所以应该在该元素的伪元素下设置`scale`属性。

```css
.scale::after {
    display: block;
    content: '';
    border-bottom: 1px solid #000;
    transform: scaleY(.5);
}
```

![img](https://pic4.zhimg.com/80/v2-b50905e383b0f2f6073643613141998b_720w.jpg)

![img](https://pic2.zhimg.com/80/v2-eb0659865d70a15ba7303e80a19b0f59_720w.jpg)

可以看到，使用`scale`属性将`border`垂直方向缩小了50%之后可以实现1px的线。而且`transform: scale`属性在ie9+以上的浏览器都支持。其他主流浏览器兼容性也不错。

![img](https://pic3.zhimg.com/80/v2-2352f8dda84c920eb6e64feb16b9bb12_720w.jpg)

## **linear-gradient**

通过线性渐变，也可以实现移动端1px的线。原理大致是使用渐变色，上部分为白色，下部分为黑色。这样就可以将线从视觉上看只有1px。

由于是通过背景颜色渐变实现的，所以这里要使用伪元素并且设置伪元素的高度。 当然，也可以不使用伪元素，但是就会增加一个没有任何意义的空标签了。

```css
div.linear::after {
    display: block;
    content: '';
    height: 1px;
    background: linear-gradient(0, #fff, #000);
}
```

![img](https://pic1.zhimg.com/80/v2-e685654f25f986d96104a861bc0903b8_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-9979c18f364a2a71298a6eb1ce2f1b2e_720w.jpg)

`linear-gradient`属性ie10+以上支持。其他主流浏览器兼容性都不错。

## **box-shadow**

通过`box-shaodow`来实现1px也可以，实现原理是将纵坐标的shadow设置为0.5px即可。`box-shadow`属性在Chrome和Firefox下支持小数设置，但是在Safari下不支持。所以使用该方法设置移动端1px时应该慎重使用。

```css
div.shadow {
    box-shadow: 0 0.5px 0 0 #000;
}
```

![img](https://pic2.zhimg.com/80/v2-9256ba928828dec5a635b8c7b338c511_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-b7dc722a1ba090303cbddc20ab9ded4e_720w.jpg)

同样的，`box-shadow`浏览器兼容性不错。

![img](https://pic1.zhimg.com/80/v2-31a9967479882c7ba68472f20e390254_720w.jpg)

## **svg**

另外，可以使用可缩放矢量图形(svg)来实现。由于是矢量图形，因此在不同设备屏幕特性下具有伸缩性。

```css
.svg::after {
    display: block;
    content: '';
    height: 1px;
    background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1px"><line x1="0" y1="0" x2="100%" y2="0" stroke="#000"></line></svg>');
}
```

在Chrome下可以显示移动端的1px，但是由于Firefox的background-image如果是svg的话，颜色的命名形式只支持英文书写方式，如'black, red'等，所以在Fire下没有1px的线。

![img](https://pic3.zhimg.com/80/v2-4cba73fab267ff650def98f3698fa146_720w.jpg)

![img](https://pic3.zhimg.com/80/v2-d2b005977979afcd00a4307c25702d7a_720w.jpg)

解决Firefox下`background-image`的svg颜色命名问题很简单。可以使用`black`这种命名方式或者将其转换成base64.

```css
方法一：颜色不采用十六进制，而是用英文方式
.svg::after {
    display: block;
    content: '';
    height: 1px;
    background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1px"><line x1="0" y1="0" x2="100%" y2="0" stroke="black"></line></svg>');
}

方法二：将svg改为base64
.svg::after {
    display: block;
    content: '';
    height: 1px;
    background-image: url('data:image/svg+xml;utf-8,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjFweCI+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwJSIgeTI9IjAiIHN0cm9rZT0iYmxhY2siPjwvbGluZT48L3N2Zz4=');
}
```

使用以上两种方式即可实现在Firefox显示1px的线。svg的浏览器兼容性还是不错的。

![img](https://pic1.zhimg.com/80/v2-f83ced0f67820e5fea00d8a6f61f90c4_720w.jpg)

当然，以上的所有方案都是基于`dpr=2`的情况下实现的，此外还需要考虑`dpr=3`的情况。因此，可以根据`media query`来判断屏幕特性，根据不同的屏幕特性进行适当的设置。如下是根据不同的dpr设置`scale`属性。

```css
@media all and (-webkit-min-device-pixel-ratio: 2) {
    .scale::after {
        display: block;
        content: '';
        border-bottom: 1px solid #000;
        transform: scaleY(.5);
    }
}

@media all and (-webkit-min-device-pixel-ratio: 3) {
    .scale::after {
        display: block;
        content: '';
        border-bottom: 1px solid #000;
        transform: scaleY(.333);
    }
}
```

## **viewport**

当然了，也可以通过`meta`视口标签根据不同的dpr对不同的页面进行缩放。这需要通过JS进行动态的设置。简单的说，假如想设置1px的线，在`dpr=2`情况下，页面就缩放到原来的一半，此时就会正常显示1px的线；在`dpr=3`的情况下，页面就缩放到原来的三分之一，此时也能够正常显示1px的线。具体实现方式如下

```css
const dpr = window.devicePixelRatio
const meta = document.createElement('meta') // 创建meta视口标签
meta.setAttribute('name', 'viewport') // 设置name为viewport
meta.setAttribute('content', `width=device-width, user-scalable=no, initial-scale=${1/dpr}, maximum-scale=${1/dpr}, minimum-scale=${1/dpr}`) // 动态初始缩放、最大缩放、最小缩放比例
```



以上呢，就是在移动端实现1px的一些方案了。总的来说，可以通过`transform: scale`对伪元素进行缩放，也可以通过`linear-gradient`对背景进行线性渐变。另外可以通过`box-shadow`在伪元素进行阴影设置。也可以使用svg，但是要注意将颜色的设置或者将其转换为base64。最后可以根据`dpr`动态将页面进行缩放。
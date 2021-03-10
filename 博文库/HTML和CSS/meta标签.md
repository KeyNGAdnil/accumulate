**viewreport**

![viewreport](https://segmentfault.com/img/remote/1460000017480059?w=1304&h=1186)

**备注:**图片截取自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

主要介绍一个当meta标签的name属性值为viewreport时的视口的大小

**1.mate标签name属性不设置viewreport**

如果不设置name的值为viewreport，默认视口宽度为980

**2.mate标签name属性设置viewreport**

- 1.content内容为空时，默认视口宽度为980
- 2.content设置width，不设置initail-scale时，视口宽度为设置的width值
- 3.content不设置width，只设置initail-scale时，是可以根据initail-scale的值计算出视口的宽度

```
initail-scale = 屏幕宽度 / 视口宽度
```

- 4.content同时设置width和initail-scale时，视口宽度为width的值，页面显示按照initail-scale比率进行缩放
- 5.一般都是进行如下设置，来实现视口宽等于设备宽，布局完成后屏幕显示也不进行缩放

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
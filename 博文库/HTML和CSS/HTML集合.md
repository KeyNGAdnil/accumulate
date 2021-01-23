# HTML5集合

### 1.语义化

HTML语义化简单来说就是，段落使用`<p></p>`，侧边栏用`<aside></aside>`，主要内容使用`<main></main>`。

- 有助于构架良好的HTML结构
- 有助于搜索引擎建立索引、抓取，有利于SEO
- 有利于不同设备的解析
- 有利于团队的开发维护

SEO：搜索引擎优化

### 2.meta viewport 是做什么用的，怎么写？

控制页面在移动端不要缩小显示。

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

### 3.HTML5的新增特性

新增加了图像、位置、存储、多任务等功能。

- 新增功能标签：可以用作画板的`canvas`，用于媒介回放的`video`和`audio`元素等
- 本地离线存储：`localStorage`长期存储数据，浏览器关闭后数据不丢失;`sessionStorage`的数据在浏览器关闭后自动删除
- 语意化更好的标签：`figure`、`footer`、`header`、`aside`、`time` 等标签
- 位置API：`Geolocation`
- 表单控件：`calendar` `date` `time` `email` `url` `search`
- 新的技术：`Web Worker`(web worker是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行) `Web Socket`
- 拖放API：`drag`、`drop`
- 离线网路程序：能够让网页在客户端本地高效地离线运行。
- History API：允许对浏览器历史记录进行操作。这对于那些交互地加载新信息的页面尤其有用。

### 4.defer 和 async 的区别

没有`defer`或`async`，浏览器在遇到`script`标签后，会立即加载并执行标签中的脚本，“立即”指的是在渲染该`script`标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

有`defer`，加载后续文档元素的过程将和`script.js`的加载并行进行（异步），但是`script.js`的执行要在所有元素解析完成之后，`DOMContentLoaded`事件触发之前完成。

有`async`，加载和渲染后续文档元素的过程将和`script.js`的加载并行进行（异步），但当`script.js`加载完后会立即执行，即停止加载和渲染后续文档元素，执行`script.js`。
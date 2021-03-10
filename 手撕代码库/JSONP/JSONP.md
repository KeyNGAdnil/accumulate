# 前端面试-跨域的解决方法 / 手写JSONP

https://juejin.cn/post/6844904021401010184

首先了解跨域的产生前提：浏览器的**同源策略**。

什么是同源(origin) : 两个页面拥有相同的协议，主机（域名相同，二级域名和主域名也算不同），端口相同，那么认为这两个页面属于同源。

### JSONP 原理与实现

同源策略虽然限制了跨域请求，但其实更细致的说只是限制了跨域的读(read)请求，对于跨域嵌入请求并没有限制，就像我们可以在`<img>`标签的`src`属性放上外链来显示图片，我们也可以通过插入`<script>`标签，修改`src`属性来实现跨域请求。

JSONP 实际上就是 JSON + Padding ,即它会把要传递的JSON 值给 填充(padding)进入一个回调函数内，我们那得到的回调函数的参数就是我们请求到的数据。

```
let jsonp = function (url, data = {}, callback) {
  // 转化数据为url字符串形式
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for(let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  // 处理url中的回调函数
  let cb_name = 'jsonpCallback'
  dataStr += 'callback=' + cb_name
  // 创建srcipt标签并添加src属性值
  let scriptBody = document.createElement('script')
  scriptBody.src = url + dataStr
  // 在全局对象上挂载回调函数
  window[cb_name] = function(data) {
    callback(data)
    document.body.removeChild(scriptBody)
  }
  // append到页面中 添加到页面就立刻发起请求
  document.body.appendChild(scriptBody)
}
复制代码
```

我们可以在控制台中试着使用一下



![img](https://user-gold-cdn.xitu.io/2019/12/16/16f0c8f56392062b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



可以发现我们已经成功执行了这次请求。

我们可以对她进行优化，将其改写为Promise形式

```js
let jsonp = function (url, data = {}, callback='callback') {
  // 转化数据为url字符串形式
  let dataStr = url.indexOf('?') === -1 ? '?' : '&'
  for(let key in data) {
    dataStr += `${key}=${data[key]}&`
  }
  // 处理url中的回调函数
  dataStr += 'callback=' + callback
  // 创建srcipt标签并添加src属性值
  let scriptBody = document.createElement('script')
  scriptBody.src = url + dataStr
 
  // append到页面中 添加到页面就立刻发起请求
  document.body.appendChild(scriptBody)
  //返回一个promise
  return new Promise((resolve, reject) => {
    window[callback] = (data) => {
      try {
        resolve(data)
      } catch(e) {
        reject(e)
      } finally {
        // 移除script元素
        scriptBody.parentNode.removeChild(scriptBody)
        console.log(scriptBody)
      }
    }
  })
}
复制代码
```

我们再在控制台进行一次请求



![img](https://user-gold-cdn.xitu.io/2019/12/16/16f0c8f652de127d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



JSONP的特点

- 兼容性较好
- 只支持发GET

### CORS

全称 `跨域资源共享(Cross-Origin Resource Sharing)`，是一种机制，它通过使用HTTP请求头来告诉浏览器允许一个web进行跨域资源请求。

首先不同的请求会被CORS分为两种类型：`简单请求`和`非简单请求`

#### 简单请求

简单请求必须同时满足以下条件:

- 使用方法为
  - GET
  - HEAD
  - POST
- 手动设置的头部字段为:
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type 「值必须在以下范围内」
    - applicatin/x-www-form-urlencoded
    - multipart/form-data
    - text/plain

发送简单请求时，请求头会带有一个一个`Origin`字段，表示来源。响应头中会有一个`Access-Control-Allow-Origin`表示可以访问该资源的域，如果`Origin`在这个域内则可以访问。

> 注意， 有时我们为了方便实现CORS会把`Access-Control-Allow-Origin`设置为`*`，即所有域都可以，但如果设置为`*`我们则无法携带Cookie。

#### 非简单请求

如果不满足简单请求条件，则会发送非简单请求。非简单请求在发送前会先发送一条`options`请求作为**预检请求**「Preflight」，他会携带以下字段：

- Access-Control-Request-Method: POST 告诉服务器 实际的请求会使用POST方法。
- Access-Control-Request-Headers: X-PINGOTHER, Content-Type 告诉服务器携带了哪些自定义首部字段。

一般响应头会包含:

- Access-Control-Allow-Origin 可接受的跨域请求源
- Access-Control-Allow-Methods 可接受的跨域请求方法
- Access-Control-Allow-Headers 可接受的自定义请求头字段

一次非简单请求的过程如下：



![img](https://user-gold-cdn.xitu.io/2019/12/16/16f0c8f56225ea73?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



具体其他跨域解法还有 `Nginx代理转发` `http-proxy` `postMessage`等。
/**
 * 1.传入3个参数 ，url、data 、callback
 * 2.将callback作为data的属性
 * 3.for in 编译和拼接传入params数组
 * 4.创建scrpt节点，拼接src字符串，然后插入到body
 * 5.返回promise对象，对象里面挂在全局回调函数
 * 6.回调函数执行resolve
*/
function jsonp(url, data = {}, callback = 'callback') {
    //处理json对象，拼接url
    data.callback = callback
    let params = []
    for (let key in data) {
        params.push(key + '=' + data[key])
    }
    let script = document.createElement('script')
    script.src = url + '?' + params.join('&')
    document.body.appendChild(script)

    //返回promise
    return new Promise((resolve, reject) => {
        window[callback] = (data) => {
            try {
                resolve(data)
            } catch (e) {
                console.log(e)
            } finally {
                script.parentNode.removeChild(script)
                console.log(script)
            }
        }
    })
}


//请求数据
jsonp('http://photo.sina.cn/aj/index', {
    page: 1,
    cate: 'recommend',
}, 'jsoncallback').then(data => {
    console.log(data)
})
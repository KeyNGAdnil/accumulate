function repeat(func, times, wait) {
    return function wrap(x) {
        for (let i = 0; i < times; i++) {
            setTimeout(() => {
                func(x)
            }, wait * (1 + i));
        }
    }
}
//使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc("helloworld")//会输出四次helloworld，每次间隔3s


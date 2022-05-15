上一段工作经历猿辅导，2年半时间。猿编程教孩子编程，python为主（scratch、点选、互动 canvas题为辅）
js版本Python解释器+Editor

技术上的展望？
技术主导的项目，需要注意哪些点？
中间层 除了磨平差异 还需要做哪些处理？
编译处理上的一些难点？while循环、渲染优化、toCsv、
扩展题目的生态？开发cli需要注意哪些方面
直播、录播技术了解
js bridge原理
知乎的团队和辅导的团队差异？
中间层兼容多端，性能就需要有所取舍，做过哪些优化处理？
electron离线应用，那hybrid如何做离线应用呢？
vue和React的对比？ vue 模板语法 react纯js写的
url queryObj




- react hooks 防抖 节流
```` js
function useDebounce(value: string, delay: number) {
    const [debounceVal, setDebounceVal] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceVal(value)
        }, delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debounceVal
}

function useThrottle(value: string, delay: number) {
    const [debounceVal, setDebounceVal] = useState(value)
    const [timer, setTimer] = useState<any>(null)
    useEffect(() => {
        if (timer) return;
        setTimer(
            setTimeout(() => {
                setDebounceVal(value)
                setTimer(null)
            }, delay)
        )
        // return () => clearTimeout(timer)
    }, [value, delay])
    return debounceVal
}
````

小程序 用css-in-js优化了项目css结构（B端

前端优化大方向

NodeJS chrome v8 js运行环境 事件驱动 非阻塞式IO
app => v8 => OS
非阻塞IO eg：排队打饭阻塞IO 餐厅点菜非阻塞IO

- koa和express的区别
express基于connect中间件 内置了很多中间件 基于callback 线性执行
koa基于co中间件，更轻量 基于generator、async/await 洋葱模型

小程序 双线程通讯机制 传统web+微信端能力 不需要下载和安装  受限微信运营规范，不如H5灵活

- pitch loader
为什么返回非undefined值会出现熔断
如果在loader开发中你的需要依赖loader其他loader，但此时上一个loader的normal函数返回的并不是处理后的资源文件内容而是一段js脚本，那么将你的loader逻辑设计在pitch阶段无疑是一种更好的方式
css-loader 返回的是js style-loader在pitch阶段执行

- async/await generator
```` js
function _asyncGen(fn) {
    return function () {
        let self = this
        let arg = arguments
        return new Promise((resolve, reject) => {
            let gen = fn.apply(self, arg)
            function _next(value) {
                asyncGen(gen, resolve, reject, _next, _throw, 'next', value)
            }
            function _throw(err) {
                asyncGen(gen, resolve, reject, _next, _throw, 'throw', err)
            }
            _next(undefined)
        })
    }
}

function asyncGen(gen, resolve, reject, _next, _throw, key, val) {
    let info, value
    try {
        info = gen[key](val)
        value = info.value

    } catch (error) {
        reject(error)
        return
    }
    let done = info.done
    if (done) resolve(value)
    else Promise.resolve(value).then(_next, _throw)
}
````

pm2的进程架构   
nginx的负载均衡
微前端沙盒的实现 qiankun
skulptJS的底层实现
monactor优于codemirror的地方
pipe stream
微前端沙箱机制

vite如何识别jsx
vite如何识别sfc

sentry如何劫持全局error

online judge的原理

class babel后实闭包么

Node vm模块

小程序开发经验

17的优化点

语法分词常见的优化有哪些

windows注册表

微前端打包 git tags是什么 https://zhuanlan.zhihu.com/p/78362028

node的库都了解哪些

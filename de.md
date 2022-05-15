## Vue3
编译模板优化 动静态模板
重写虚拟dom 静态提升和事件缓存
proxy 兼容 惰性响应式
天然的tree shaking ESM
组合式API 解决了mixin的通点：命名冲突 hooks功能更单一
Teleport 
toRefs 为什么解构后拿到的就不是响应式数据了？

## vue2
- <keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
>> include、exclude、max：缓存组件的最大值
>> 被keepalive包含的组件不会被再次初始化，也就意味着不会重走生命周期函数，会多出两个生命周期的钩子: activated 与 deactivated
>> 前进刷新，后退不刷新: 在后退时将from路由的keepAlive置为false，to路由的keepAlive置为ture。
- 为什么data返回的是一个函数
>> data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象
- 深度监听 defineReactive的递归实现
>>> Object.defineProperty 缺点
>>> 深度监听时，需要递归到底，一次性计算量大
>>> 无法监听新增属性/删除属性（所以开发中需要使用 Vue.set 和 Vue.delete 这两个 API 来增删 data 的属性）
>>> 无法原生监听数组，需要特殊处理

- 由于性能原因，Vue 不是通过 Object.defineProperty 来监听数组的。
>> 对于数组，是通过重写数组方法来实现，共修改了两处：
>> 对原生数组原型做一个备份（防止后续的操作污染原生数组原型），基于这个备份创建一个新的数组，并扩展（在执行原方法前触发一次视图更新）它的方法。Object.create(Array.prototype)
>> observer 方法中，增加对数组的处理。

## vite
利用浏览器对ESM的支持 no bundle + 动态绑定
依赖预构建 package.json dep / force更新依赖 / 减少模块依赖多次请求 、兼容commonjs umd

node事件循环
对宏任务做了更细的优先级划分，高到低 timer pending idle/prepare poll check close
对微任务也做了优先级划分 nextTick微任务和其他微任务
执行一定数量的宏任务和所有微任务

etag last-modify
必须一次性发给server etag优先级更高 有e就不用last-modify

vue2 数组为什么不是响应式
一千个元素都响应式 性能很low

浏览器输入url
url解析是否合法
dns查询
tcp连接
服务器处理请求
浏览器接受响应 渲染页面 执行js

1kw条数据如何渲染
innnerHTML
fragment
懒加载

如何查看一个元素在可视区域
-h < o - s < vh
getBoundingRect top left right bottom 均大于0

flex
12 auto 3
下面的元素移动上来 盖住

闭包 实现带缓存的函数 空间换时间 记忆函数

react 18新特性

react16 比 15优秀 fiber任务可以被打断

vue2 依赖收集和事件派发

JS GC 标记清除结束了完了么 GC还有别的东西么

electron 怎么跟window 或者 mac通信的

content-hash

带延时的柯里化

白屏优化 骨架屏 惰性加载保证核心功能


## Electron项目注意点
- 背景 没有原生开发 效率低
- 市面常见的桌面应用框架 Electron NWJS 对比？
- 进程模型
>> - 主进程 进程间通信 窗口管理 依赖node能力
>> - 渲染进程 web页面渲染 全局状态
>> - serviceWorker 离线应用 缓存一些网络图片、音频静态资源 如何实现的？
- CI CD
- 热更新
- 杀毒软件的问题

- 优化策略
影响 Electron 白屏的主要因素有：页面窗口的创建、静态资源的加载、JavaScript 解析和执行
>> - 骨架屏 vue-content-loader svg 首页接口返回的时候 hide(用户信息，示例项目，个人项目)
>> - 懒加载 代码分割（splitChunk） 延后加载node模块（node模块加载为什么慢）划分加载优先级如何做的
>> - 每次Electron升级需要注意什么？不同版本之间的差异？（每次升级都会使用最新的chrome
>> - 既然Electron是最新的？直接用ES6开发上线会有什么问题么？  
>> - 窗口预热和窗口池
>> - serviceWorker workbox 静态资源缓存
>>> precaching.precacheAndRoute 接口完成 precache 操作：处理路径、query参数
>>> 也可以通过命令行、webpack插件生成预缓存列表
>>> 路由请求缓存策略：Stale While Revalidate(去cache同时也有network),network first、network only、cache first、cache only
```` js
workbox.precaching.preacheAndRoute([
    '/styles/index.0c9a31.css', 
    '/scripts/main.0d5770.js', {
    url: '/index.html',
    revision: '383676'
}, ]);
````
>> - 
>> - 
>> - 

- 标记清除 https://juejin.cn/post/6981588276356317214
>> - 标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁
>> - 引擎在执行 GC（使用标记清除算法）时，需要从出发点去遍历内存中所有的对象去打标记，而这个出发点有很多，我们称之为一组 根 对象，而所谓的根对象，其实在浏览器环境中包括又不止于 全局Window对象、文档DOM树 等
>> 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0
>> 然后从各个根对象开始遍历，把不是垃圾的节点改成1
>> 清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
>> 最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收

- MVC MVVM的区别
>> - MVC 一种编程模式 特点：耦合性低、重用性高、可维护性高。缺点：需要精心规划，模型和视图严格分离，调试应用程序困难。系统实现复杂，视图与控制器过于紧密的连接
>> - MVVM MVC的改进版。MVVM 就是将其中的View 的状态和行为抽象化，将视图UI和业务逻辑分开,ViewModel可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。与MVC的区别：实现了View和Model的自动同步。

## React15 16 17 18的区别
- V15 React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们, 一气呵成。这个过程 React 称为 Reconcilation(协调)
>> 协调阶段执行：diff 节点新增、删除、属性变更等等，部分生命周期钩子 render
- v16 引入fiber
>> fiber 一种流程控制的原语 一个执行单元
>> requestIdleCallback 超时检查机制让出控制权的原理，不过requestIdleCallback有50ms的超时限制（最长空闲执行时间段），最快执行的帧率在20fps，react自己实现了让出机制
>> 数据结构的调整，v16以前 Reconcilation 是同步的、递归执行的，stack结构不能随意中断、也很难被恢复, 不利于异步处理
>> v16.8 发布了hooks

- v17
>> 渐进式升级
>> 事件委托的变更
>> useEffect的回调修改为异步调用（同步可能会阻塞渲染），而useLayoutEffect是同步执行的
>> 返回一致的undefined错误: 这个改动几乎无感。以前，React只对class和函数组件执行此操作，但并不会检查forwardRef和memo组件的返回值。现在都会检查，不要写奇怪的代码是不会挂的。最好用 return null 来代替。

- v18
>> 渲染的自动批处理 Automatic batching 优化, 主要解决异步回调中无法批处理的问题
>> 

### react
- setState 传入函数和传入对象的区别 https://blog.csdn.net/weixin_44029226/article/details/120378489
>> 如果传入函数，那么会进行链式调用，这个函数会被react加入到一个执行队列中，多次调用结果依旧正确
- setState batchUpdate 很早之前的版本就有了 v18之前和v18表现不同，v18以前在react event中批量更新是开启的

- batchUpdate和concurrent mode的区别
>> batchUpdate 脱离上下文环境的更新不会被合并
>> concurrent mode 是以优先级进行更新的

- React的组件，无论是class组件还是函数组件，在开发模式下，每次渲染会执行两次。 https://segmentfault.com/a/1190000022782864
>> 这样做是React刻意而为之。防止组件内有什么side effect而引起bug，提前预防。

- 闭包陷阱问题
>> https://juejin.cn/post/7093931163500150820
```` js
import { useEffect, useRef, useState } from 'react';

function Dong() {
    const [count,setCount] = useState(0);
    const fn = () => {
      console.log(count)
    }
    const ref = useRef(fn)

    ref.current = fn; // 每次render重新赋值

    useEffect(() => {
        setInterval(() => {
            setCount(count =>count + 1);
        }, 500);
    }, []);

    useEffect(() => {
        setInterval(() => {
            ref.current();
        }, 500);
        // return 
    }, []);

    return <div>guang</div>;
}

export default Dong;
````


```` js
interface IdleDealine {
  didTimeout: boolean // 表示任务执行是否超过约定时间
  timeRemaining(): DOMHighResTimeStamp // 任务可供执行的剩余时间
}
````

- js bridge
>> url schema webview注入 拦截ajax native调用eval(js)

## PM2进程架构
Daemon.js 守护进程的主要逻辑实现，包括 rpc server，以及各种守护进程的能力
god.js 业务进程的包裹层，负责与守护进程建立连接，以及注入一些操作，我们编写的代码最终是由这里执行的
PM2特点:
内建负载均衡（使用Node cluster 集群模块、子进程，可以参考朴灵的《深入浅出node.js》一书第九章）
线程守护，keep alive
0秒停机重载，维护升级的时候不需要停机.
现在 Linux (stable) & MacOSx (stable) & Windows (stable).多平台支持
停止不稳定的进程（避免无限循环）
控制台检测
提供 HTTP API
远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互)

## nginx负载均衡算法
轮询法
随机法
源地址hash法
加权轮询法
加权随机法
最小连接数法

## NodeJS
- NodeJS的技术架构？
>> nodejs 单线程执行JS，V8 本身是多线程的，开一个线程执行 js，开一个线程清理内存，然后再处理一些其他别的活儿。期间有通过node binding调用C++，libuv负责执行跨平台的异步IO(分配线程去执行IO)，完成IO添加回调任务到事件循环队列
- V8有哪些功能?
>> 将JS源代码变成本地代码并执行、维护函数调用栈、垃圾回收、内存管理、JS标准库
- libuv单独开线程做的事情有哪些
- 如何理解EventLoop

## electron
>> 用 HTML，CSS 和 JavaScript 来构建跨平台桌面应用程序的一个开源库
- nodejs是如何集成到chromium的?
>> 浏览器的时间循环和NodeJS的事件循环不一样，起了一个新的安全线程转发了Node的事件循环
>> - Spectron 和 Devtron 的作用？
>>> Spectron可以和其他的mocha等测试框架进行结合，测试electron
Devtron是Electron DevTools的扩展，可以帮助你检查，监控和调试应用程序。默认是关闭状态
>>> electron-forge的作用？快速构建electron的工具，包含打包、自动更新等

## XSS攻击预防
>>> XSS攻击类型：请求数据、点击链接、通过修改原始的客户端代码，受害者浏览器的 DOM 环境改变
>>> <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />的作用:资源加载的白名单，防止XSS攻击 或者 设置 HTTP 的 Content-Security-Policy 头部字段也可
>>> 不安全内容转义，做了 HTML 转义，并不等于高枕无忧。对于链接跳转，如 <a href="xxx" 或 location.href="xxx"，要检验其内容，禁止以 javascript: 开头的链接，和其他非法的 scheme。


- session
>> - cookie携带sessionId
>> - sessionId 写到数据库或者持久层可以实现不同域名只登录一次

- JWT
>> - JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，
>> - jwt的优点 不依赖服务器部署方式（服务器无关的 jwt的载荷可以携带一些信息，减少数据库的查询
>> - jwt的缺点 没有加密base64编码的 jwt可以携带数据，在http header上携带，性能low 一次性，无法续签 会被盗用（可以用https传输)
>> - 适合场景 有效期短 只希望被使用一次


- https先对称然后非对称的原理
>> - 因为非对称传输性能low，所以用非对称协商一个密钥，再用对称传输数据（rsa：有涉及大数乘法和大数模运算，对称AES算法，主要是位运算） 
>> - 非对称协商有可能被中间人劫持，需要证明证书和公钥确实本人的
>> - 数字证书: 网站使用https之前，需要向CA申请数字证书，网站的身份证：证书持有者信息、公钥信息，但这里有个问题？证书本身的传输过程中，如何防止被篡改
>> - 数字签名的制作过程：
>>> 1. CA机构有非对称加密的公钥和私钥
>>> 2. CA机构对证书明文数据T进行hash
>>> 3. 对hash后的值用私钥加密，得到数字签名S。
>> - 浏览器验证过程
>>> 1. 拿到证书，得到明文T，签名S
>>> 2. 用CA机构的公钥对S解密得到S'
>>> 3. 用证书里指明的hash算法对明文T进行hash得到T'
>>> 4. 对比T' S'

- 传统CSS的缺陷
>> - 缺乏模块化
>> - 缺乏作用域
>> - 隐式依赖，难以追踪 append到head中，不知控制哪部分布局
>> - 有部分变量, 但是没有css-in-js灵活

## vue和react的区别
- 都有组件化思想 都支持服务器端渲染 都有Virtual DOM（虚拟dom）
- 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
>> - 更有利于做撤销和重做（react优势）
>> - 检查变化就会非常的块，如果prevProps === props（react优势）
>> - 也利于调试，当然也不用劫持

>> - vue用可变数据 因为有劫持的原因，数据驱动视图更简单

- diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，两端到中间，边对比，边更新DOM，vue更高效，时间复杂度低

- vuex和redux
>> - 在Vuex中，$store被直接注入到了组件实例中，因此可以比较灵活的使用
>> - 在Redux中，每一个组件都需要用connect把props和dispatch连接起来
>> - Vuex更加灵活一些，组件中既可以dispatch action，也可以commit updates，而Redux中只能进行dispatch，不能直接调用reducer进行修改。

- 模板渲染方式的不同
>> - 模板的原理不同，这才是他们的本质区别：React是在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的，更加纯粹更加原生。而Vue是在和组件JS代码分离的单独的模板中
>> 如 react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下

## ES6 commonjs的区别 https://segmentfault.com/a/1190000039395423
- commonjs模块输出的是值的浅拷贝，ES6模块输出的是值的引用 ES6 Module是值的动态映射，并且这个映射是只读的
- commonJS对模块依赖解决是“动态的”，ES6 Module是静态的
- 循环依赖 有cache 不会有问题 先cache 后load
- ES6 可以做tree shaking

## tree shaking
- 原理 入口=>分析源码，确定依赖 => AST 遍历 => 标记是否被引用 => 清除dead code

## 依赖注入 
控制反转(IOC)是指由原来的控制权在内部（实例化）变化为控制权在外部（导入的文件内部），这时，依赖的控制权就由原来的内部变为了外部进行控制，达到控制反转的效果。而控制反转与依赖注入是一体两念，是一个思想。控制反转侧重于描述目的，是将依赖的控制权从代码的内部转移到代码的外部；依赖注入侧重于描述手段，就是如何实现控制反转？在Angular中通过依赖注入这个手段去实现控制反转。

## pm2 restart reload
reload一般只是从新读取一次配置文件。
restart则是把进程停掉，从头启动一次。

## 删除require缓存
delete require.cache[require.resolve("./module")

## 函数柯里化得实现
https://www.jianshu.com/p/ce88a4d993f4

## observer和promise的区别
对于promise,无论是否调用then。promise都会立即执行；而observables只是被创建，当调用的时候才会被执行
Promise解决异步编程的问题，Observable 可以同步也可以异步
异步任务的取消Promise不可以，Observable可以 unsubscribe
一次执行和多次执行

## 基于页面performance 可以做哪些优化?
- fetchStart redirectStart redirectEnd（最后一个http重定向完成的时间
- 首屏时间： DNS解析、TCP握手、资源加载、DOM解析 domInteractive - fetchStart


## 微前端
- 沙箱的本质诉求
>> 约束一个子应用在开发过程中使用的全局变量。需要同时支持多个沙箱环境存在，每个沙箱需要有加载、卸载、再次恢复的能力，其对应着微应用的运行生命周期
>> 单实例子和多实例的区别
>>> - 单实例：资源独占，应用切换的时候的变量污染清理与应用再次启动时的变量恢复
>>> - 多实例：资源不是应用独占，需要解决资源共享的问题，比如路由，样式，全局变量读写，DOM

- 沙箱实现方案
>> - iframe沙箱 全局变量的隔离 路由隔离（可以用独立路由，也可以用共享路由） 多实例
>> - fakeWindow 实现 Object.create({}) 代理fakeWindow

- qiankun的沙箱
>> proxySandBox用于多实例场景 
>> 在不支持proxy的场景下会降级成snapshotSandBox 基于diff快照

- CSS隔离
>> css module / css scoped / BEM
>> css in js 缺点：不利于我们后期的项目维护并且也比较难去抽离一些公共 css
>> - qiankun的两种方式
>>> 硬隔离 shadow dom strictStyleIsolation
>>> 加上容器前缀 experimentalStyleIsolation 

- 路由系统

- 构建时组合 VS 运行时组合
>> 构建时组合 打包优化:依赖共享 缺点：子应用发布也需要主应用发布
>> 运行时组合 动态加载依赖 主子应用完全解耦 技术栈无关 缺点：复杂度和overhead

- JS entry vs HTML Entry
>> JS Entry 的方式通常是子应用将资源打成一个 entry script. 所有资源打包到一个 js bundle 里,包体积大 资源并行加载的特性也无法使用
>> HTML Entry 则更加灵活,通过 fetch html 的方式获取子应用的静态资源,天然的解决子应用之间样式隔离的问题

## webpack
- hash chunkhash contenthash

## TS核心概念
- TS和JS的区别 
>> JS变量本身没有类型，JS 的类型是和值绑定的

- TS的优势
>> 将类型系统看作为文档，在代码结构相对复杂的场景中比较适用，本质上就是良好的注释
>> 配合 IDE，有更好的代码自动补全功能
>> 配合 IDE，在代码编写的过程中就能进行一些代码校验

- any、void、unknow、never
>> any 任意类型
>> void 无任何类型
>> unknow 未知类型 any类型的安全版本 不允许执行 unknown 类型变量的方法
>> never 永不存在的值的类型，eg：trow error | 死循环
>>> never是所有类型的子类型，但是never不能赋值给never
```` ts
let ne: never
let num: number = ne
````

- 联合类型
>> 列出的类型 满足其一即可
>> 有个问题：当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
```` ts
// 解决方法1 typeof 类型推断
function getLength(something: string | number): number {
  if (typeof something === 'string') { // TS 能识别 typeof 语句
    return something.length
  } else {
    return 0
  }
}
// 方法2 类型断言
function getLength(something: string | number): number {
  return (something as string).length
}
````
>> 字符串 字面量类型
```` js 
type EventNames = 'click' | 'scroll' | 'mousemove'
````
>> 元组 可以看做是固定长度和元素类型的数组 let man: [string, number] = ['Tom', 25]
>> 枚举
enum Directions {
  Up,
  Down,
  Left,
  Right,
}
>> TS 工具类型
### 泛型 类型的参数化
### 工具类型
- keyof
```` ts
interface Eg1 {
  name: string,
  readonly age: number,
}
// string
type V1 = Eg1['name']
// string | number
type V2 = Eg1['name' | 'age']
// any
type V2 = Eg1['name' | 'age2222']
// string | number
type V3 = Eg1[keyof Eg1]
````
- & 交叉类型
>> 交叉类型取的多个类型的并集，但是如果相同key但是类型不同，则该key为never。
- 类型继承
```` ts
interface T1 {
  name: string,
}

interface T2 {
  sex: number,
}

/**
 * @example
 * T3 = {name: string, sex: number, age: number}
 */
interface T3 extends T1, T2 {
  age: number,
}
````
>> 注意，接口支持多重继承，语法为逗号隔开。如果是type实现继承，则可以使用交叉类型type A = B & C & D。
>> type和interface的区别：type 可以声明基本类型别名，联合类型，元组等类型；interface 能够声明合并
>> 一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type
```` ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
````

## 手写源码
- new 注意返回值
- bind 注意new调用
- deepCopy 循环引用 日期 正则 数组
>> Object.keys(obj) ： 结果是object 上所有可枚举的key; 
>> Reflect.ownKeys(obj) : 结果是所有的 key。
- 函数柯里化 fn.length
- instanceof __proto__
- sentry如何拦截全局的error
>> window.addEventListener("unhandledrejection"
>> window.addEventListener("error"
>> 框架有自己的error 例如aixos中使用interceptor进行拦截，vue、react都有自己的错误采集接口
>> 实例方法重写 setTimeout等

// function testIdelCb() {
//     function fibonacci(n) {
//         if (n == 0 || n == 1)
//             return n;
//         return fibonacci(n - 1) + fibonacci(n - 2);
//     }

//     function calc() {
//         console.log('befroe', Date.now())
//         let number = 100000000
//         console.log(fibonacci(number))
//         console.log('after', Date.now())
//     }
//     function cb(deadline) {
//         while (deadline.timeRemaining() > 1) {
//             calc();
//         }
//         requestIdleCallback(cb)
//     }
//     requestIdleCallback(cb)
// }


// function limit(count, array, iteraFn) {
//     const doingTasks = []
//     const tasks = []
//     let i = 0
//     function enqueue() {
//         if (i === array.length) {
//             return Promise.resolve()
//         }
//         const task = Promise.resolve().then(() => iteraFn(array[i++]))
//         tasks.push(task)
//         const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing, 1)))
//         doingTasks.push(doing)
//         const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve()

//         return res.then(enqueue)
//     }
//     return enqueue().then(() => Promise.all(tasks))
// // }

// function asyncAdd(a, b, callback) {
//     setTimeout(function () {
//         callback(null, a + b);
//     }, 500);
// }

// function promiseAdd(a, b) {
//     return new Promise((resolve, reject) => {
//         asyncAdd(a, b, (err, res) => {
//             if (err) reject(err)
//             else resolve(res)
//         })
//     })
// }

// function serialSum(...args) {
//     return args.reduce((prev, cur) => prev.then(res => promiseAdd(res, cur)), Promise.resolve(0))
// }

// function parallelSum(...args) {
//     if (args.length === 1) return args[0]
//     const tasks = []
//     for(let i = 0; i < args.length; i += 2) {
//         tasks.push(promiseAdd(args[i], args[i+1] || 0))
//     }
//     return Promise.all(tasks).then((result) => parallelSum(...result))
// }

// (async () => {
//     console.log('Running...');
//     const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
//     console.log(res1)
//     const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
//     console.log(res2)
//     console.log('Done');
//   })()
  


// Dep module
// class Dep {
//     static stack = []
//     static target = null
//     deps = null
    
//     constructor() {
//       this.deps = new Set()
//     }
  
//     depend() {
//       if (Dep.target) {
//         this.deps.add(Dep.target)
//       }
//     }
  
//     notify() {
//       this.deps.forEach(w => w.update())
//     }
  
//     static pushTarget(t) {
//       if (this.target) {
//         this.stack.push(this.target)
//       }
//       this.target = t
//     }
  
//     static popTarget() {
//       this.target = this.stack.pop()
//     }
//   }
  
//   // reactive
//   function reactive(o) {
//     if (o && typeof o === 'object') {
//       Object.keys(o).forEach(k => {
//         defineReactive(o, k, o[k])
//       })
//     }
//     return o
//   }
  
//   function defineReactive(obj, k, val) {
//     let dep = new Dep()
//     Object.defineProperty(obj, k, {
//       get() {
//         dep.depend()
//         return val
//       },
//       set(newVal) {
//         val = newVal
//         dep.notify()
//       }
//     })
//     if (val && typeof val === 'object') {
//       reactive(val)
//     }
//   }
  
//   // watcher
//   class Watcher {
//     constructor(effect) {
//       this.effect = effect
//       this.update()
//     }
  
//     update() {
//       Dep.pushTarget(this)
//       this.value = this.effect()
//       Dep.popTarget()
//       return this.value
//     }
//   }
  
//   // 测试代码
//   const data = reactive({
//     msg: 'aaa'
//   })
  
//   new Watcher(() => {
//     console.log('===> effect', data.msg);
//   })
  
//   setTimeout(() => {
//     data.msg = 'hello'
//   }, 1000)
  

Array.prototype.flat = flat

function flat(deep) {
    if (deep === undefined) deep = 1
    const arr = this
    if (deep === -1) return [arr]
    const res = []
    arr.forEach(item => {
        if (Array.isArray(item)) res.push(...item.flat(deep - 1))
        else res.push(item)
    });
    return res
}

console.log([1,2,3,4,[5,6,[7,8]]].flat())
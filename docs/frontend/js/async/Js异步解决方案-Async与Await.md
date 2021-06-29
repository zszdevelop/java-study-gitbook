# Js异步解决方案-Async与Await（六）

## 1.Async和Await简介

ES2017 标准引入了 `async` 函数，使得异步操作变得更加方便

JS异步编程解决方案的历程，从经典的回调函数到事件监听，再到 `Promise` ，再到 `Generator` ，再到我们要说的 `Async/Await` ，可谓艰辛

`Async/Await` 的出现，被很多人认为是JS异步操作的最终且最优雅的解决方案

`Async/Await` 大家都经常使用，也都知道它是 `Generator` 的语法糖

其实我觉得 `Async/Await = Generator + Promise` 这个解释更适合

`async` 是异步的意思，而 `await` 是 `async wait` 的简写，即异步等待

所以从语义上就很好理解 `async` 用于声明一个 `function` 是异步的，`await` 用于等待一个异步方法执行完成

另外 `await` 只能出现在 `async` 函数中

## 2. Async在做什么

我们来看一个例子理解

```js
async function test() {
  return "this is async"
}
const res = test()
console.log(res)
// Promise {<resolved>: "this is async"}
```

可以看到，输出的是一个Promise对象

所以，`async` 函数返回的是一个 Promise 对象，如果在 `async` 函数中直接 return 一个直接量，`async` 会把这个直接量通过 `PromIse.resolve()` 封装成Promise对象返回

既然 `async` 返回一个 Promise，那么我们也可以用 `then` 链来处理这个 Promise 对象，如下

```js
test().then(res=>{
  console.log(res)
})
```

## 3. Await在等待什么

我们常说`await` 是在等待一个异步完成， 其实按照语法说明， `await` 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值(换句话说，就是没有特殊限定，啥都行)

- `await` 后面不是Promise对象，直接执行
- `await` 后面是Promise对象会阻塞后面的代码，Promise对象 `resolve`，然后得到 `resolve` 的值，作为 `await` 表达式的运算结果
- `await` 只能在 `async` 函数中使用

使用比较简单，大家也经常用就不多说了

### 3.1 为什么 `await` 必须要在 `async` 函数中使用

`await` 会阻塞后面代码，如果允许我们直接使用 `await` 的话，假如我们使用`await`等待一个消耗时间比较长的异步请求，那代码直接就阻塞不往下执行了，只能等待 `await` 拿到结果才会执行下面的代码，那不乱套了

而 `async` 函数调用不会造成阻塞，因为它内部所有的阻塞都被封装在一个 Promise 对象中异步执行，所以才规定 `await` 必须在 `async` 函数中

## 4. 处理异常

promise正常resolve，那么await会返回这个结果，但是在reject的情况下会抛出一个错误

所以我们直接把 `await` 代码块写到 `try()catch()` 中捕获错误即可

```js
async function fn(){
  try{
    let res = await ajax()
    console.log(res)
  }catch(err){
    console.log(err)
  }
}
```

## 5. 没有对比没有伤害

我们经常会遇到这种业务，多个请求，每个请求依赖于上一个请求的结果

我们用setTimeout模拟异步操作，用Promise和Async/Await分别来实现下

```js
function analogAsync(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 500), n)
  })
}

function fn1(n) {
  console.log(`step1 with ${n}`)
  return analogAsync(n)
}

function fn2(n) {
  console.log(`step2 with ${n}`)
  return analogAsync(n)
}

function fn3(n) {
  console.log(`step3 with ${n}`)
  return analogAsync(n)
}
```

使用Promise

```js
function fn(){
  let time1 = 0
  fn1(time1)
    .then((time2) => fn2(time2))
    .then((time3) => fn3(time3))
    .then((res) => {
    	console.log(`result is ${res}`)
  	})
}

fn()
```

使用Async/Await

```js
async function fn() {
  let time1 = 0
  let time2 = await fn1(time1)
  let time3 = await fn2(time2)
  let res = await fn3(time3)
  console.log(`result is ${res}`)
}

fn()
```

输出结果和上面用Promise实现是一样的，但这个 `aaync/await` 代码结构看起来清晰得多，几乎跟同步写法一样，十分优雅

我们再来看下面这个小例子

```js
// Generator
function* gen(){
  let f1 = yield ajax()
  let f2 = yield ajax()
}
gen()

// async/await
async function asyncAjax(){
  let f1 = await ajax()
  let f2 = await ajax()
}
asyncAjax()

```

这两块代码看着是不是几乎一样

上面函数为Generator函数执行两个ajax，下面函数为async/await执行

比较可发现，两个函数其实是一样的，`async` 不过是把Generator函数的 `*` 号换成 `async`，`yield` 换成 `await`

那么这两个函数在调用时，Generator函数需要手动调用 `next` 方法或者使用 co 函数库才可执行，而下面的`async` 函数直接就按顺序执行完成了，使用非常方便

异步编程追求的是，让它更像同步编程， `Async/Await` 完美诠释了这一点

到这里我们其实就不难看出 `Async/Await` 已经完虐了 `Generator` 和 `Promise`

## 6. Async/Await优/缺

### 6.1 优点

内置执行器， Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 `async` 函数自带执行器，也就是说，`async` 函数的执行，与普通函数一模一样，只要一行

更好的语义，`async` 和 `await`，比起 `*` 和 `yield`，语义更清楚了，`async` 表示函数里有异步操作，`await` 表示紧跟在后面的表达式需要等待结果

更广的适用性，co 函数库约定，`yield` 命令后面只能是 Thunk 函数或 Promise 对象，而 `async` 函数的 `await` 命令后面，可以跟 Promise 对象和原始类型的值(数值、字符串和布尔值，但这时等同于同步操作)

### 6.2 缺点

滥用 `await` 可能会导致性能问题，因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性

## 参考文章

[「硬核JS」深入了解异步解决方案](https://juejin.cn/post/6844904064614924302#heading-65)


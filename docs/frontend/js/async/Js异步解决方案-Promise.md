### Js异步解决方案-Promise（四）

## 1. 简介

ES2015 (ES6)标准化和引入了Promise对象，它是异步编程的一种解决方案

简单来说就是用同步的方式写异步的代码，可用来解决回调问题

## 2. Promise特点

### 2.1 特点一

Promise，承诺执行，Promise对象的状态是不受外界影响的

Promise对象代表一个异步操作，它有三种状态

- 进行中 (Pending)
- 已完成 (Resolved/Fulfilled)
- 已失败 (Rejected)

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态

这就是Promise这个名字的由来，它的英语意思就是`承诺`，表示其他手段无法改变

### 2.2 特点二

Promise对象状态一旦改变，就不会再变

Promise对象的状态改变，只有两种可能

- 从Pending变为Resolved
- 从Pending变为Rejected

只要这两种情况发生，状态就凝固，不会再变了，会一直保持这个结果

## 3. Promise使用

Promise是一个构造函数，我们可以通过`new`关键字来创建一个Promise实例，也可以直接使用Promise的一些静态方法

### 3.1 new一个Promise实例

**语法**

```
new Promise( function(resolve, reject) {...});
```

**示例**

```
function fn1(){
  return new Promise((resolve,reject) => {
    setTimeout(()=>{
      let num = Math.ceil(Math.random()*10)
      if(num < 5){
        resolve(num)
      }else{
        reject('数字太大')
      }
    },2000)
  })
}
```

我们使用`new`关键字创建了一个promise实例，并在函数fn1中`return`了出来

`new Promise`创建了一个promise实例，Promise构造函数会把一个叫做处理器函数(executor function)的函数作为它的参数

#### 3.1.1 resolve`和`reject

处理器函数接收两个参数分别是`resolve`和`reject`，这两个参数也是两个回调函数

`resolve` 函数在异步操作成功时调用，并将异步操作的结果，作为参数传递出去

`reject` 函数在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

简单理解就是一个是成功回调，一个是失败回调

### 3.2 Promise.prototype.then()

Promise对象有一个原型方法`then`

Promise实例生成以后，可以用`then`方法指定`resolved`状态和`reject`状态的回调函数

```js
Promise.prototype.then(onFulfilled, onRejected)
```

`then`方法接收两个回调onFulfilled和onRejected

- onFulfilled-可选
  - 当 Promise 变成已完成状态(fulfilled)时调用的回调函数
  - 该函数有一个参数，即接受的最终结果(the fulfillment  value)
  - 如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回promise最终结果的函数
- onRejected-可选
  - 当 Promise 变成接受状态或拒绝状态(rejected)时调用的回调函数
  - 该函数有一个参数，即拒绝的原因(rejection reason)
  - 如果该参数不是函数，则会在内部被替换为一个 `Thrower` 函数(it throws an error it received as argument)

**`then`方法在接收一个promise实例后会返回一个新的Promise实例(**并不是原来那个Promise实例)，且原来的promise实例的返回值将作为参数传入这个新Promise的`resolve`函数

那么既然`then`方法返回一个新的promise实例，所以我们可以接着使用`then`方法，即链式调用，也被称为 **复合(composition)**操作

接上面的示例，函数fn1会返回一个promise实例

```
fn1()
  .then((data)=>{
    console.log(data)
  },(err)=>{
    console.log(err)
  })
```

如上所示，我们使用了`then`方法的两个参数

第一个参数回调我们很常用，其实就是 Promise 变成已完成状态且拿到传递的值

第二个参数回调就是 Promise 变成接受状态或拒绝状态且拿到错误参数，我们可能用的少，一般都是用`catch`方法，`then`方法的第二个参数onRejected和`catch`还是有一些细微区别的，下面会提到

#### 3.2.1 `then`方法的特点

**首先`then` 方法必须返回一个 `promise` 对象(划重点)**

链式调用的原理，不论是何种情况then方法都会返回一个新的Promise对象，这样才会有下个then方法

**如果`then`方法中返回的是一个普通值(如Number、String等)就使用此值包装成一个新的Promise对象返回**

就像下面这个例子，`then`方法接收Promise对象，`then`方法中返回一个普通值时，下一个`then`中是可以接到的

```js
let p =new Promise((resolve,reject)=>{
  resolve(1)
})

p.then(data=>{
  return 2	// 返回了一个普通值
}).then(data=>{
  console.log(data) // 2
})
```

**如果`then`方法中没有`return`语句，就返回一个用Undefined包装的Promise对象**

如下面例子的输出结果

```
let p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(data => {
  // 无return语句
}).then(data => {
  console.log(data) // undefined
})
```

**如果`then`方法中出现异常，则调用失败态方法(reject)跳转到下一个`then`的onRejected**

`then`方法的第二个参数onRejected是监测不到当前`then`方法回调异常的，规范中定义当前`then`方法出现异常则调用失败态方法(reject)流转到下一个`then`的onRejected

```
let p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(data => 2)
  .then(
    data => {
      throw "this is err"
    },
    err => {
      console.log("err1:" + err)
    }
  )
  .then(
    data => {
      console.log(data)
    },
    err => {
      console.log("err2:" + err) // err2:this is err
    }
  )
```

**如果`then`方法没有传入任何回调，则继续向下传递(即所谓的值穿透)**

下面示例，在第一个`then`方法之后连续调用了两个空的`then`方法 ，没有传入任何回调函数，也没有返回值，此时Promise会将值一直向下传递，直到接收处理，这就是所谓的值穿透

```
let p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(data => 2)
.then()
.then()
.then(data => {
  console.log(data) // 2
})
复制代码
```

**如果`then`方法中返回了一个Promise对象，那就以这个对象为准，返回它的结果**

话不多说，来看示例

```
let p = new Promise((resolve, reject) => {
  resolve(1)
})

p.then(data => {
  return new Promise((resolve, reject) => {
    resolve(2)
  })
}).then(data => {
  console.log(data) // 2
})
```

### 3.3 Promise.prototype.catch()

除了原型方法`then`之外，Promise对象还有一个`catch`的原型方法

`catch`方法可以用于promise组合中的错误处理，此方法返回一个Promise，并且处理拒绝的情况

```
p.catch(onRejected);

p.catch(function(reason) {
  // 拒绝
});
```

- onRejected
  - 当Promise 被rejected时，被调用的一个回调函数，该函数拥有一个参数为失败原因或错误信息

简单理解就是捕获异常，promise组合中抛出了错误或promise组合中出现rejected会被捕获

同样接最上面的示例，还使用fn1函数

```
fn1()
  .then(data=>{
    console.log(data)
  }).catch(err=>{
    console.log(err)
  })
```

使用这种方式捕获错误或失败是不是比`then`方法的第二个参数看着舒服了点呢，毕竟Promise就是链式到底

同样也需要注意一点，`catch`方法也返回一个新的promise实例，如果 `onRejected`回调抛出一个错误或返回一个本身失败的 Promise ，通过 `catch` 返回的Promise 会被rejected，否则，它就是一个成功的(resolved)promise实例

和上面的`then`方法中的第二个参数几乎是一致的，我们看例子

```js
fn1()
  .catch(err => {
    console.log(err)
    return err
  })
  .then(data => {
    console.log(data)
  })
	.catch(err => {
    console.log(err)
  })
```

上面的fn1函数有一半的几率返回一个rejected，当返回一个rejected时下面的`then`方法回调中同样会输出，因为我们在第一个`catch`中只return了错误信息，并没有抛出错误或者返回一个失败promise，所以第一个`catch`执行返回的promise对象是resolveing

### 3.4 Promise.prototype.finally()

finally，英文是`最后`的意思，此方法是`ES2018`的标准

原型方法`finally`，我们使用的可能不多，语法如下

```
p.finally(onFinally);

p.finally(function() {
  // 返回状态为(resolved 或 rejected)
});
复制代码
```

一句话即可解释`finally`，在promise结束时，不管成功还是失败都将执行其`onFinally`回调，该回调无参数

适用于同样的语句需要在`then()`和`catch()`中各写一次的情况

### 3.5 Promise.resolve()

一句话概括Promise.resolve()方法，接收一个值，将现有对象转为Promise 对象

```js
Promise.resolve(value)
```

如下所示，该值可为任意类型，也可是一个Promise对象

```js
const p = Promise.resolve(123);

Promise.resolve(p).then((value)=>{
  console.log(value); // 123
});
```

### 3.6 Promise.reject()

`Promise.reject()`方法同上面`Promise.resolve()`一样，只不过是返回一个带有拒绝原因的`Promise`对象

```
Promise.reject(123)
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log("err:" + err)
  })

// err:123
```

### 3.7 Promise.all()

`Promise.all(iterable)`用于将多个Promise 实例包装成一个新的 Promise实例，参数为一组 Promise 实例组成的数组

iterable类型为ES6标准引入，代表可迭代对象，`Array`、`Map`和`Set`都属于`iterable`类型 ，iterable下面我们会讲到，这里我们就先把这个参数理解成数组就可以，稍后配合下面的iterable来理解

```js
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

let p = Promise.all([p1,p2,p3]);

p.then(data=>{
  console.log(data) // [1,2,3]
})
```

如上所示，当 p1, p2, p3 状态都 Resolved 的时候，p 的状态才会 Resolved

只要有一个实例 Rejected ，此时第一个被 Rejected 的实例返回值就会传递给 P 的回调函数

```js
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = Promise.reject(3)

let p = Promise.all([p1, p2, p3])
p.then(data => {
  console.log(data)
}).catch(err => {
  console.log("err:" + err) // 3
})
```

应用场景在我们有一个接口，需要其他两个或多个接口返回的数据作为参数时会多一些

### 3.8 Promise.race()

`Promise.race(iterable)`和上面`Promise.all(iterable)`类似

`all`方法是迭代对象中状态全部改变才会执行

`race`方法正好相反，只要迭代对象中有一个状态改变了，它的状态就跟着改变，并将那个改变状态实例的返回值传递给回调函数

```
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "1")
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "2")
})

Promise.race([p1, p2])
  .then(value => {
    console.log(value) // 2
  })
```

## 4. 相关问题

### 4.1 onRejected和catch区别

上面提到了`promise.then(onFulfilled, onRejected)`中的第二个参数onRejected和`catch`

看到这大家可能会问，同样都是捕获异常它们的区别在哪

其实`promise.then(onFulfilled, onRejected)` 在 `onFulfilled`回调中发生异常的话，在`onRejected`中是捕获不到这个异常的，使用`catch`可以捕获到前面的onFulfilled的异常

其实这不算个缺点，我们完全可以在末尾多加一个`then`从而达到和`catch`相同的作用，如下

```js
Promise.reject(1)
  .then(() => {
    console.log("我是对的")
  })
  .then(null, err => {
    console.log("err:" + err) // err:1
  })

// 等价于

Promise.reject(1)
  .then(() => {
    console.log("我是对的")
  })
  .catch(err => {
    console.log("err:" + err) // err:1
  })
```

就这么点区别，不过大部分人都喜欢直接使用`catch`罢了

### 4.2 then中抛错未处理

如果在then中抛错，而没有对错误进行处理(catch)，那么会一直保持reject状态，直到catch了错误

我们来看一段代码

```
Promise.resolve()
	.then(()=>{
  	console.log(a)
  	console.log("Task 1");
	})
  .then(()=>{
  	console.log("Task 2");
	})
  .catch((err)=>{
  	console.log("err:" + err)
	})
  .then(()=>{
  	console.log("finaltask")
	});

// err:ReferenceError: a is not defined
// finaltask
复制代码
```

我们看上面代码，我们在第一个`then`中输出了一个未声明的变量

输出结果先走了`catch`然后走了最后一个`then`，第一个`then`中抛出错误并跳过了第二个`then`

也就是说如果我们没有处理这个错误(无catch)的话，就不会往下执行了

可参考下图

![image-20210617194234349](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210617194234349.png)

promise的缺点之一就是无法让promise中断，利用这个特性可以让Promise中断执行，也算一种办法吧

### 4.3 异步回调中抛错catch捕捉不到

首先我们看在Promise对象的处理器函数中直接抛出错误

```
const p = new Promise((resolve, reject)=>{
  throw new Error('这是一个错误')
});
p.catch((error)=>{ console.log(error) });
复制代码
```

按照上述内容来看，在Promise对象的处理器函数中直接抛出错误，`catch`是可以捕捉到的

在下面代码，在Promise对象的处理器函数中模拟一个异步抛错

```
const p = new Promise((resolve, reject)=>{
  setTimeout(()=>{ throw new Error('这是一个错误') }, 0)
});
p.catch((error)=>{ console.log(error) });
复制代码
```

这种情况`catch`是捕捉不到的，这是为什么呢？先想后看，再做不难

**原因**

JS 事件循环列表有宏任务与微任务之分，setTimeOut是宏任务， promise是微任务，执行顺序不同

那么这段代码的执行顺序是：

1. 代码执行栈进入promise 触发setTimeOut，setTimeOut回调函数入宏任务队列
2. 代码执行promise的catch方法，入微任务队列，此时setTimeOut回调还没有执行
3. 执行栈检查发现当前微任务队列执行完毕，开始执行宏任务队列
4. 执行`throw new Error('这是一个错误')` 此时这个异常其实是在promise外部抛出的

**解决**

使用`try catch`捕获异常主动触发`reject`

```
const p = new Promise((resolve, reject)=>{
  setTimeout(()=>{ 
    try{
       throw new Error('这是一个错误') 
    }catch(e){
       reject(e)
    }
 }, 0)
});
p.catch((error)=>{ console.log(error) });
```

## 5. Promise优/缺

### 5.1 **优点**

Promise用同步的方式写异步的代码，避免了层层嵌套的回调函数

Promise对象提供了统一的接口，使得控制异步操作更加容易

链式操作，可以在then中继续写Promise对象并返回，然后继续调用then来进行回调操作

### 5.2 **缺点**

Promise对象一旦新建就会立即执行，无法中途取消

若不设置回调函数，Promise内部会抛出错误，不会流到外部

当处于pending状态时，无法得知当前处于哪一阶段

用多了Promise后代码一眼看上去都是promise的API，而且链式语法总觉得不好看，不优雅

## 参考文章

[「硬核JS」深入了解异步解决方案](https://juejin.cn/post/6844904064614924302#heading-10)
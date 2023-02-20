# lodash使用与常用函数

## 1. 简介

[Lodash 中文网](https://www.lodashjs.com/)
Lodash 是一个著名的 javascript 原生库，不需要引入其他第三方依赖，是一个意在提高开发者效率,提高 JS 原生方法性能的JS 库。简单的说就是，很多方法 lodash 已经帮你写好了，直接调用就行，不用自己费尽心思去写了，而且可以统一方法的一致性。Lodash 使用了一个简单的 _ 符号，就像 Jquery 的 $ 一样，十分简洁。

## 2. 集成使用

### 2.1 安装

```bash
npm i lodash -S
```

### 2.2 引入

在main.js 中引入

```js
import _ from 'lodash'
Vue.prototype._ = _
```

### 2.3 使用

N次循环

```js
// Lodash
_.times(5, function(){
    //...
});
```

## 3. 常用函数1

### 3.1 判断对象为空

```js
_.isEmpty(null);
// => true
 
_.isEmpty(true);
// => true
 
_.isEmpty(1);
// => true
 
_.isEmpty([1, 2, 3]);
// => false
 
_.isEmpty({ 'a': 1 });
// => false

```

检查 `value` 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。

对象如果被认为为空，那么他们没有自己的可枚举属性的对象。

类数组值，比如`arguments`对象，array，buffer，string或者类jQuery集合的`length` 为 `0`，被认为是空。类似的，map（映射）和set 的`size` 为 `0`，被认为是空。 

### 3.2 N次函数

```js
// 1. Basic for loop.
for(var i = 0; i < 5; i++){
    //...
}

// 2. Using Array's join and split methods
Array.apply(null, Array(5)).forEach(function(){
    //...
});

// Lodash
_.times(5, function(){
    //...
});
```

for 语句是执行虚幻的不二选择，Array.apply也可以模拟循环，但在上面代码的使用场景下，_.tiems()的解决方法更加简洁和易于理解。

### 3.3 深层查找属性值

```js
// 从每个主人那里获取第一只宠物的名字
var ownerArr = [{
    "owner": "Colin",
    "pets": [{"name": "dog1"}, {"name": "dog2"}]
}, {
    "owner": "John",
    "pets": [{"name": "dog3"}, {"name": "dog4"}]
}];

// Array's map method.
let petsNameByArrayMap = ownerArr.map(function (owner) {
   	return owner.pets[0].name;
});
// 每个人第一个宠物名字（使用 Array's map）：dog1,dog3
console.log("每个人第一个宠物名字（使用 Array's map）：" + petsNameByArrayMap);

// Lodash
let petsNameByLodash = _.map(ownerArr, "pets[0].name");
// 每个人第一个宠物名字（使用Lodash）：dog1,dog3
console.log("每个人第一个宠物名字（使用Lodash）：" + petsNameByLodash);
```

_.map 方法是对原生 map 方法的改进，其中使用 pets[0].name 字符串对嵌套数据取值的方式简化了很多冗余的代码，非常类似使用jQuery选择DOM节点 ul>li>a , 对于前端开发者来说有种久违的亲切感。

### 3.4 个性化数组

```js
// Array's map method.
Array.apply(null, Array(6)).map(function(item, index){
    return "ball_" + index; 
});

// Lodash
_.times(6, _.uniqueId.bind(null, 'ball_'));

// Lodash
_.times(6, _.partial(_.uniqueId, 'ball_'));
// eg. [ball_0, ball_1, ball_2, ball_3, ball_4, ball_6]
```

在上面的代码中，我们要创建一个初始值不同、长度为6的数组，其中 _.uniqueId 方法用于生成独一无二的标示符（递增的数字，在程序运行期间保持独一无二）， _.partial 方法是对 bind 的封装。

### 3.5 深拷贝

```js
var objA = {
    "name": "colin"
}

// 常用的方法一般会比较长，循环对象等
// http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript

// Lodash
var objB = _.cloneDeep(objA);
objB === objA // false
```

JavaScript 没有直接提供深拷贝的函数，但是我们可以用其他杉树来模拟，比如 JSON.parse(JSON.stringify(objectToClone)), 但这种方法要求对象中的属性值不能是函数。Lodash 中的 _.cloneDeep 函数封装了深拷贝的逻辑，用起来更加简洁。

### 3.6 **随机数**

```js
// Native utility method
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(15, 20);

// Lodash
_.random(15, 20);
```

Lodash 的随机数生成函数更贴近实际开发，ECMAScript 的随机数生成函数式底层必备的接口，两者都不可获取。此外，使用 _.random(15, 20, true) 还可以在15到20之间生成随机的浮点数。

### 3.7 对象扩展

```js
// Adding extend function to Object.prototype
Object.prototype.extend = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            this[i] = obj[i];
        }
    }
};

var objA = {"name": "colin", "car": "suzuki"};
var objB = {"name": "james", "age": 17};

objA.extend(objB);
objA; // {"name": "james", "age": 17, "car": "suzuki"};

// Lodash
_.assign(objA, ojbB);
```

_.assign 是浅拷贝， 和ES6新增的 Object.assign 函数功能一致（建议优先使用Object.assign）。

### 3.8 筛选属性

去除掉某些属性

```js
// Native method: Remove an array of keys from object
Object.prototype.remove = function(arr) {
    var that = this;
    arr.forEach(function(key){
        delete(this[key]);
    });
};

var objA = {"name": "colin", "car": "suzuki", "age": 17};

objA.remove(['car', 'age']);
objA; // {"name": "colin"}

// Lodash
objA = _.omit(objA, ['car', 'age']);
// => {"name": "colin"}

objA = _.omit(objA, "car");
// => {"name": "colin", "age": 17}

objA = _.omit(objA, _.isNumber);
// => {"name": "colin", "car": "suzuki"};
```

大多数情况下，Lodash所提供的辅助函数都会比原声的函数更贴近开发需求。在上面的代码中，开发者可以使用数组、字符串以及函数的方式筛选对象的属性，并且最终会返回一个新的对象，中间执行筛选时不会对旧对象产生影响。

```js
// Native method: Returning a new object with selected properties
Object.prototype.pick = function(arr) {
    var _this = this;
    var obj = {};
    arr.forEach(function(){
        obj[key] = _this[key];
    });
    
    return obj;
};

var objA = {"name": "colin", "car": "suzuki", "age": 17};

var objB = objA.pick(['car', 'age']);
// => {"car": "suzuki", "age": 17}

// Lodash
var objB = _.pick(objA, ['car', 'age']);
// => {"car": "suzuki", "age":17}
```

_.pick 是 _.omit 的相反操作，用于从其他对象中挑选属性生成新的对象。

### 3.9 随机元素

```js
var luckDraw = ["Colin", "John", "James", "Lily", "Mary"];

function pickRandomPerson(luckyDraw){
    var index = Math.floor(Math.random() * (luckyDraw.length - 1));
    return luckyDraw[index];
}

pickRandomPerson(luckyDraw); //John

// Lodash
_.sample(luckyDraw); // Colin

// Lodash - Getting 2 random item
_.sample(luckyDraw, 2); // ['John', 'Lily']
```

_.sample 支持随机挑选多个元素并返回新的数组。

## 4. 常用函数2

### 4.1 判断对象中是否含有某元素

```js
var smartPerson = {
    'name': '戈德斯文',
    'gender': 'male'
  },
  smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];


console.log(_.includes(smartPerson, '戈德斯文'));
console.log(_.includes(smartTeam, '杨海月'));
console.log(_.includes(smartTeam, '杨海月',2));
```

`_.includes()`第一个参数是需要查询的对象，第二个参数是需要查询的元素，第三个参数是开始查询的下标

## 参考文章

[Lodash 中文网](https://www.lodashjs.com/)

[Loadsh 常用方法总结以及在vue中使用Loadsh](https://www.cnblogs.com/wenqiangit/p/11762459.html)


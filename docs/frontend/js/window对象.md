# window对象

## 1.window对象

>在Web中使用js，BOM 是js的核心，BOM的核心对象是window，它表示浏览器的一个实例。

window既表示js访问**浏览器窗口的接口**，又是ECMAscript规定的**Global**对象

### 1.1 全局作用域

> 由于 window对象同时扮演着ES中的Global对象的角色，因此所有在全局作用域中声明的变量，函数都会变成window对象的属性和方法。

```
var age = 29
function sayAge() {
    console.log(this.age)
}
console.log(window.age) // 29
sayAge()    // 29
window.sayAge() // 29

```

#### 1.1.1 在项目中实例

在项目中我们常需要用到一些全局变量（如baseUrl跟环境有关），并且这个变量需要在线上环境配置地址。

可以定义system-init.js：

```js
window.systemParams = {
    BASE_API:"http://127.0.0.1:8080/",//网络请求基础路径
};
```

在index.html 引用该全局变量

```html
<html lang="en">
  <head>
   	...
    <script src="./system-init.js" ></script>
 </head>
```

在项目的任意一个地方都能使用

```
let baseURL =  window.systemParams.BASE_API;
```

### 1.2 导航和打开窗口

windiow.open(打开地址，A标签target属性，新窗口配置项)

```
 window.open("https://www.baidu.com/");
```

| 参数          |  取值范围  |                             说明 |
| ------------- | :--------: | -------------------------------: |
| alwaysLowered |   yes/no   |       指定窗口隐藏在所有窗口之后 |
| alwaysRaised  |   yes/no   |       指定窗口悬浮在所有窗口之上 |
| depended      |   yes/no   |             是否和父窗口同时关闭 |
| directories   |   yes/no   |          Nav2和3的目录栏是否可见 |
| height        | pixelvalue |                         窗口高度 |
| hotkeys       |   yes/no   | 在没菜单栏的窗口中设安全退出热键 |
| innerHeight   | pixelvalue |             窗口中文档的像素高度 |
| innerWidth    | pixelvalue |             窗口中文档的像素宽度 |
| location      |   yes/no   |                   位置栏是否可见 |
| menubar       |   yes/no   |                   菜单栏是否可见 |
| outerHeight   | pixelvalue | 设定窗口(包括装饰边框)的像素高度 |
| outerWidth    | pixelvalue | 设定窗口(包括装饰边框)的像素宽度 |
| resizable     |   yes/no   |               窗口大小是否可调整 |
| screenX       | pixelvalue |       窗口距屏幕左边界的像素长度 |
| screenY       | pixelvalue |       窗口距屏幕上边界的像素长度 |
| scrollbars    |   yes/no   |               窗口是否可有滚动栏 |
| titlebar      |   yes/no   |               窗口题目栏是否可见 |
| toolbar       |   yes/no   |               窗口工具栏是否可见 |
| Width         | pixelvalue |                   窗口的像素宽度 |
| z-look        |   yes/no   | 窗口被激活后是否浮在其它窗口之上 |

```
var a = window.open('page.html', 'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
```

使用open方法打开后可以控制新的窗口,只适用于新打开窗口

```
//窗口移动至0，0的位置
a.moveTo(0,0)
//向下移动100像素
window.moveBy(0,100)
//调整浏览器大小至
a.resizeTo(100,100)
调整浏览器加大100，50
a.resizeBy(100,50)
//关闭窗口
a.close()
新页面关联旧页面
window.opener
```



### 1.3 延时器和定时器

```
//设置延时器
var timeout = setTimeout(()=>{},100)
//清空延时器
clearTimeout(timeout)
//设置定时器
var Interval = setInterval(()=>{},100)
//清空定时器
clearInterval(Interval)
```

### 1.4 窗口大小

| 属性                                                         |                 位置                 |
| ------------------------------------------------------------ | :----------------------------------: |
| window.innerWidth window.innerHeight                         |    页面视图区域大小**包含滚动条**    |
| window.outerWidth window.outerHeight                         |          浏览器窗口本身大小          |
| document.documentElement.clientHeight document.documentElement.clientWidth | 返回页面视图区域大小**不包含滚动条** |



### 1.5 窗口位置

| 属性       | 位置 |                     支持浏览器 |
| ---------- | :--: | -----------------------------: |
| screenLeft | 左边 |      IE、Safari、Opera、Chrome |
| screenTOP  | 上边 |      IE、Safari、Opera、Chrome |
| screenX    | 左边 | FireFox、Safari、Opera、Chrome |
| screenY    | 上边 | FireFox、Safari、Opera、Chrome |




### 1.6 窗口关系及框架

这里的框架指的不是我们现在所使用的react、vue框架，而是<frameset/>标签。

```html
<html>
    <head>
       <title>理解万岁</title>
    </head>
    <frameset rows = '160,*'>
        <frame src="index.html" name="index">
        <frameset clos = '50%,50%'>
            <frame src="indexOne.html" name="indexOne">
            <frame src="indexTwo.html" name="indexTwo">
        </frameset>
    <frameset>
</html>

```

### 1.7 系统弹框

1. alert() 提示框
2. confirm() 选择框
3. prompt() 输入框
4. window.print() 打印框
5. window.find() 查找框 需要输入查找的字段

## 2. location对象



| 属性     |                     描述                      |
| -------- | :-------------------------------------------: |
| hash     |    设置或返回从井号 (#) 开始的 URL（锚）。    |
| host     |     设置或返回主机名和当前 URL 的端口号。     |
| hostname |         设置或返回当前 URL 的主机名。         |
| href     |            设置或返回完整的 URL。             |
| pathname |        设置或返回当前 URL 的路径部分。        |
| port     |         设置或返回当前 URL 的端口号。         |
| protocol |          设置或返回当前 URL 的协议。          |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

```
window.location = http://www.baidu.com
loacation.assign (http://www.baidu.com)
loacation.href = http://www.baidu.com
```

以上三种效果一样

```
location.reload() //刷新页面
location.replace()//跳转至新的页面并且不会保存当页面的历史，用户不能回退至当前页面
```

## 3. history 对象

> 保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为history是window对象的属性，因此每个浏览器窗口、每个标签乃至每个框架，都有自己的history对象与特定的window对象关联。

### 3.1 go()

> 可以在用户的历史记录中任意跳转。可以向前或向后。接受一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转，正数表示向前跳转。

```
window.history.go(-1);  //返回上一页
```



### 3.2 back()

> 可以模仿浏览器的后退操作

```
window.history.back();  //返回上一页
```



### 3.3 forward()

> 模仿浏览器的前进按钮



# 参考文章

[重学JavaScript之window对象](https://juejin.im/post/6844904002535030798)

[红皮书-第八章-BOM](https://juejin.im/post/6844904005265539080)
# css文本超出就隐藏并且显示省略号

## 1. 简介

css文本超出就隐藏并且显示省略号，非常常见的需求。但也有一些坑。特此记录一下

## 2. 实现

### 2.1 单行实现

```css
overflow:hidden; //超出的文本隐藏
text-overflow:ellipsis; //溢出用省略号显示
white-space:nowrap; //溢出不换行
```

### 2.2 **两行的内容时候**

```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; //作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; //显示的行
```

## 3. 遇到的坑

### 3.1 flex布局与white-space: nowrap 冲突问题

如果我们flex布局的**孙子容器**中包含了white-space: nowrap。那么他可能会失效。

如

```html
<view class="content">
			<view class="left">
				<view class="text">我是测试文本我有这么这么长，我是测试文本我有这么这么长，我是测试文本我有这么这么长，我是测试文本我有这么这么长</view>
				<view>描述文字</view>
			</view>
			<view class="right">查看详情</view>
		</view>
		
```

css属性

```css
.content{
		display: flex;
		flex-direction: row;
		.left{
			flex: 1;
			.text {
				font-size: 50rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		.right{
			width: 100rpx;
			background-color: #ff0000;
		}
	}
```

#### 3.1.1 解决办法

在子容器中新增 min-width: 0;

```css
.left{
			flex: 1;
			min-width: 0;
}
```



### 3.2 在uniapp 的text标签中省略号不生效

如果是`<text>` 标签

>Ps:text 标签设置宽度都不管用

![image-20220401214519580](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401214519580.png)

#### 3.2.1 解决办法

换成`<view>`标签就可以

![image-20220401214627701](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220401214627701.png)

## 参考文章

[css 文本超出就隐藏并且显示省略号](https://blog.csdn.net/u013868665/article/details/78893158)
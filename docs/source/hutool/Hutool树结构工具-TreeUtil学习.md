# Hutool树结构工具-TreeUtil学习

## 1. 简介

### 1.1 应用场景：

我们在项目中时经常需要用到树结构，如部门管理的上下级，菜单管理等。都是存在着上下级关系。

### 1.2 Hutool的TreeUtil优势

Hutool的`TreeUtil`是 扩展性极好的树状结构实现。这种树状结构可以根据配置文件灵活的定义节点之间的关系，也能很好的兼容关系数据库中数据。实现

```
关系型数据库数据  <->  Tree  <->  JSON
```

### 1.3 面临的问题

树状结构中最大的问题就是关系问题，在数据库中，每条数据通过某个字段关联自己的父节点，每个业务中这个字段的名字都不同，如何解决这个问题呢？

**自定义字段名，节点不再是一个bean，而是一个map，实现灵活的字段名定义**。

## 2. 使用

### 2.1 定义结构

我们假设要构建一个菜单，可以实现系统管理和店铺管理，菜单的样子如下：

```
系统管理
    |- 用户管理
    |- 添加用户

店铺管理
    |- 商品管理
    |- 添加商品
```

那这种结构如何保存在数据库中呢？一般是这样的：

| id   | parentId | name     | weight |
| ---- | -------- | -------- | ------ |
| 1    | 0        | 系统管理 | 5      |
| 11   | 1        | 用户管理 | 10     |
| 111  | 1        | 用户添加 | 11     |
| 2    | 0        | 店铺管理 | 5      |
| 21   | 2        | 商品管理 | 10     |
| 221  | 2        | 添加添加 | 11     |

我们看到，每条数据根据`parentId`相互关联并表示层级关系，`parentId`在这里也叫外键。

### 2.2 构建Tree

```java
// 构建node列表
List<TreeNode<String>> nodeList = CollUtil.newArrayList();

nodeList.add(new TreeNode<>("1", "0", "系统管理", 5));
nodeList.add(new TreeNode<>("11", "1", "用户管理", 222222));
nodeList.add(new TreeNode<>("111", "11", "用户添加", 0));
nodeList.add(new TreeNode<>("2", "0", "店铺管理", 1));
nodeList.add(new TreeNode<>("21", "2", "商品管理", 44));
nodeList.add(new TreeNode<>("221", "2", "商品管理2", 2));
```

> TreeNode表示一个抽象的节点，也表示数据库中一行数据。 如果有其它数据，可以调用`setExtra`添加扩展字段。

```java
// 0表示最顶层的id是0
List<Tree<String>> treeList = TreeUtil.build(nodeList, "0");
```

因为两个Tree是平级的，再没有上层节点，因此为List。

### 2.3 自定义字段名

```java
//配置
TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
// 自定义属性名 都要默认值的
treeNodeConfig.setWeightKey("order");
treeNodeConfig.setIdKey("rid");
// 最大递归深度
treeNodeConfig.setDeep(3);

//转换器
List<Tree<String>> treeNodes = TreeUtil.build(nodeList, "0", treeNodeConfig,
        (treeNode, tree) -> {
            tree.setId(treeNode.getId());
            tree.setParentId(treeNode.getParentId());
            tree.setWeight(treeNode.getWeight());
            tree.setName(treeNode.getName());
            // 扩展属性 ...
            tree.putExtra("extraField", 666);
            tree.putExtra("other", new Object());
        });
```

通过TreeNodeConfig我们可以自定义节点的名称、关系节点id名称，这样就可以和不同的数据库做对应。

## 3. 源码分析

### 3.1 Tree源码

![image-20211022200317096](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022200317096.png)

- Tree 它继承自 LinkedHashMap<String, Object>

  - 优势

    - LinkedHashMap 可以记录插入的顺序

    - 可以非常方便的扩展属性

      ```java
      /**
      	 * 扩展属性
      	 *
      	 * @param key   键
      	 * @param value 扩展值
      	 */
      	public void putExtra(String key, Object value) {
      		Assert.notEmpty(key, "Key must be not empty !");
      		this.put(key, value);
      	}
      ```

- 默认配置

  - 如果没有设置配置，则使用默认配置

    ```java
    public Tree(TreeNodeConfig treeNodeConfig) {
    		this.treeNodeConfig = ObjectUtil.defaultIfNull(
    				treeNodeConfig, TreeNodeConfig.DEFAULT_CONFIG);
    	}
    ```

- 对于Tree 节点的插入都是调用map的。但是具体的key名，需要从treeNodeConfig中获取

  ![image-20211022201140972](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022201140972.png)

### 3.2 Node接口

![image-20211022201335122](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022201335122.png)

- 定义了构成树的必要节点
- 其中默认实现了 compareTo 排序

![image-20211022201447544](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022201447544.png)

### 3.3 TreeUtil 工具类

![image-20211022202111338](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202111338.png)

TreeUtil 主要是各种构造器的入口

![image-20211022202615115](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202615115.png)

### 3.4 TreeBuilder 构造器

![image-20211022202248598](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202248598.png)

treeBuilder 才是真正实现树结构的实现

![image-20211022202400647](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202400647.png)

#### 3.4.1 添加节点列表

将我们的列表添加到 LinkedHashMap中。以id为key。以节点为值

![image-20211022202741529](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202741529.png)

#### 3.4.2 节点解析器

在上面的添加节点列表中，有一步

```
nodeParser.parse(t, node);
```

他是扩展节点属性的关键因素

![image-20211022203210810](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022203210810.png)

默认节点解析器，就做简单的转换

![image-20211022203240188](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022203240188.png)

#### 3.4.3 append 到全局map

最后的append 就是将tree 添加到全局的treemap中

![image-20211022205137274](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022205137274.png)

![image-20211022203324209](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022203324209.png)

#### 3.4.4 开始构建代码

![image-20211022202445998](https://gitee.com/zszdevelop/blogimage/raw/master/image-20211022202445998.png)

1. 先对所有节点进行排序
2. 如果是根节点就塞进根节点列表
3. 如果不是根节点则将此节点放入父节点的子树中

不用递归就实现了树结构。牛逼！！！

## 参考文章

[树结构工具-TreeUtil](https://hutool.cn/docs/#/core/语言特性/树结构/树结构工具-TreeUtil?id=树结构工具-treeutil)
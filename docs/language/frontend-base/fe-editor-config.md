# 统一代码风格工具editorConfig

## 1. 背景

团队中有多人进行项目开发时，每个人可能喜欢的编辑器不同，有人喜欢webstrom、有人用VsCode、还有人用sublime。

我们无法强迫开发者使用某种开发工具，那么我们如何让开发者都遵循统一的代码规范呢？

这时候我们就需要editorConfig了，**在editorConfig里的配置的代码规范优先级是高于编辑器默认的代码格式化规则**。

## 2. editorConfig 简介

editorConfig不是什么软件，而是一个名称为.editorconfig的自定义文件。该文件用来定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且**其优先级比编辑器自身的设置要高**

当打开一个文件时，EditorConfig插件会在打开文件的目录和其每一级父目录查找.editorconfig文件，直到有一个配置文件root=true

EditorConfig的配置文件是从上往下读取的并且最近的EditorConfig配置文件会被最先读取. 匹配EditorConfig配置文件中的配置项会按照读取顺序被应用, 所以最近的配置文件中的配置项拥有优先权

**如果.editorconfig文件没有进行某些配置，则使用编辑器默认的设置**

## 3. 配置.editorconfig

在当前项目根目录下添加`.editorconfig`文件

editorconfig文件是定义一些格式化规则（此规则并不会被vscode直接解析）

### 3.1 官网的一个配置

```js
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file 表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
root = true

# Unix-style newlines with a newline ending every file 对于所有的文件  始终在文件末尾插入一个新行
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset  对于所有的js,py文件，设置文件字符集为utf-8
[*.{js,py}]
charset = utf-8

# 4 space indentation 控制py文件类型的缩进大小
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified) 设置某中文件的缩进风格为tab Makefile未指明
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory  设置在lib目录下所有JS的缩进为
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml 设置确切文件 package.json/.travis/.yml的缩进类型
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2


```

## 4. 语法

editorConfig配置文件需要是UTF-8字符集编码的, 以回车换行或换行作为一行的分隔符

斜线(/)被用作为一个路径分隔符，井号(#)或分号(;)被用作于注释. 注释需要与注释符号写在同一行

### 4.1 通配符

```
*                匹配除/之外的任意字符串
**               匹配任意字符串
?                匹配任意单个字符
[name]           匹配name中的任意一个单一字符
[!name]          匹配不存在name中的任意一个单一字符
{s1,s2,s3}       匹配给定的字符串中的任意一个(用逗号分隔) 
{num1..num2}   　匹配num1到num2之间的任意一个整数, 这里的num1和num2可以为正整数也可以为负整数

```

### 4.2 属性

所有的属性和值都是忽略大小写的. 解析时它们都是小写的

```
indent_style    设置缩进风格(tab是硬缩进，space为软缩进)
indent_size     用一个整数定义的列数来设置缩进的宽度，如果indent_style为tab，则此属性默认为tab_width
tab_width       用一个整数来设置tab缩进的列数。默认是indent_size
end_of_line     设置换行符，值为lf、cr和crlf
charset         设置编码，值为latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom
trim_trailing_whitespace  设为true表示会去除换行行首的任意空白字符。
insert_final_newline      设为true表示使文件以一个空白行结尾
root        　　　表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件

```

### 4.3 控制指定文件类型的缩进大小

这里可以设置，如下：

```
[{*.json,*.yml}]
indent_style = space
indent_size = 2
```

对于`.json` `.yml` 文件，使用空格替代tab，并且一个tab会被替换为2个空格。

### 4.4 文件末尾新行

始终在文件末尾插入一个新行

```
[*]
end_of_line = lf
insert_final_newline = true
```

对于所有的文件

- 每一行的尾部自动调整为 Lf
- 文件的末尾是一个空行

## 5. 实例

```
# 告诉EditorConfig插件，这是根文件，不用继续往上查找
root = true

# 匹配全部文件
[*]
# 设置字符集
charset = utf-8
# 缩进风格，可选space、tab
indent_style = space
# 缩进的空格数
indent_size = 4
# 结尾换行符，可选lf、cr、crlf
end_of_line = lf
# 在文件结尾插入新行
insert_final_newline = true
# 删除一行中的前后空格
trim_trailing_whitespace = true

# 匹配md结尾的文件
[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

```

#### 5.1 测试是否可用：

在项目的 js 文件中使用 tab 键进行缩进，分别修改 indent_size 属性值为 2 和 4，观察是否有变化。如果没有任何变化，说明还没有安装 Editorconfig 插件。

## 6. 编辑器中安装使用

### 6.1 VSCode中安装EditorConfig

![image-20210924210740884](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210740884.png)

EditorConfig扩展的作用是读取第一步创建的editorconfig文件中定义的规则，并覆盖user/workspace settings中的对应配置（从这我们也可以看出vscode本身其实是并不直接支持editorconfig的）

#### 6.1.1 全局安装或局部安装

editorconfig依赖包(npm install -g editorconfig | npm install -D editorconfig)
安装editorconfig依赖包主要是因为EditorConfig依赖于editorconfig包，不安装的可能会导致EditorConfig无法正常解析我们在第一步定义的editorconfig文件

### 6.1.2 使用

打开需要格式化的文件并手动格式化代码（shift+alt+f）

## 7. 导出editorconfig文件

### 7.1 webstorm 导出editorconfig文件

操作步骤：webstorm里找到配置，按照以下图示导出.editorconfig，.editorconfig文件会出现在项目的根目录里：

![image-20210924210543587](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210543587.png)



![image-20210924210707992](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210924210707992.png)

## 参考文章

[vscode使用editorconfig插件以及.editorconfig配置文件说明(统一代码风格工具——editorConfig)](https://blog.csdn.net/Gabriel_wei/article/details/90286668)

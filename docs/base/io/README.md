# IO流

## 什么是IO

- i:  输入

  从本地写入程序叫输入

- o:  输出

  从程序写出到本地叫输出

都是相对我们程序的 

## 什么是IO流

**IO流的用来处理设备之间数据传输的**，传输电的叫电流，传输水的叫水流，传输数据的就叫数据流

![image-20190724224037201](./img/image-20190724224037201.png)

## 流的分类

- 按操作**数据单位**不同
  - 字节流（8bit）
  - 字符流（16bit）

- 按数据流的**流向**不同
  - 输入流
  - 输出流
- 按流的**角色**的不同分为
  - 节点流
  - 处理流

| 抽象基类 | 字节流       | 字符流 |
| -------- | ------------ | ------ |
| 输入流   | InputStream  | Reader |
| 输出流   | OutputStream | Writer |

## 具体IO流实现类

java的IO流共设计40多个类，都是从以上4个类派生出来的

| 分类       | 字节输入流           | 字节输出流            | 字符输入流        | 字符输出流         |
| ---------- | -------------------- | --------------------- | ----------------- | ------------------ |
| 抽象基类   | InputStream          | OutputStream          | Reader            | Writer             |
| 访问文件   | FileInputStream      | FileOutputStream      | FileReader        | FileWriter         |
| 访问数组   | ByteArrayInputStream | ByteArrayOutputStream | CharArrayReader   | CharArrayWriter    |
| 访问管道   | PipedInputStream     | PipedOutputStream     | PipedReader       | PipedWriter        |
| 访问字符串 |                      |                       | StringReader      | StringWriter       |
| 缓冲流     | BufferedInputStream  | BufferedOutputStream  | BufferedReader    | BufferedWriter     |
| 转换流     |                      |                       | InputStreamReader | OutputStreamWriter |
| 对象流     | ObjectInputStream    | ObjectOutputStream    |                   |                    |
|            | FilterInputStream    | FilterOutputStream    | FilterReader      | FilterWriter       |
| 打印流     |                      | PrintStream           |                   | PrintWriter        |
| 推回输入流 | PushbackInputStream  |                       | PushbackReader    |                    |
| 特殊流     | DataInputStream      | DataOutputStream      |                   |                    |


# 缓冲流

## 基本架构

| 抽象基类     | 节点流(文件流)   | 缓冲流（处理流的一种）          |
| ------------ | ---------------- | ------------------------------- |
| InputStream  | FileInputStream  | BufferedInputStream             |
| OutputStream | FileOutputStream | BufferedOutputStream（flush()） |
| Reader       | FileReader       | BufferedReader                  |
| Writer       | FileWriter       | BufferedWriter（flush()）       |

## 为什么缓冲流快一些

- 底层数组实现
- read方法是非阻塞式的
  - FileInputStream是阻塞式的
  - BufferInputStream 不是阻塞式的

## 使用缓冲流实现非文本复制

同样复制一个200M 的文件，不带缓冲需要3000ms，带缓冲500ms

实际开发中使用**缓冲流较多，因为效率高**

```
  // 1. 提供读入，写入的文件
        File file = new File("1.png");
        File file2 = new File("2.png");
        // 2.创建相应的节点流，FileInputStream、FileOutputStream
        FileInputStream fis = new FileInputStream(file);
        FileOutputStream fos = new FileOutputStream(file2);
        // 3.将创建的节点流的对象作为形参传递给缓冲流的构造器中
        BufferedInputStream bis = new BufferedInputStream(fis);
        BufferedOutputStream bos = new BufferedOutputStream(fos);
        // 4.具体的实现文件复制操作
        byte[] b = new byte[1024];
        int len;
        while ((len = bis.read(b)) != -1){
            bos.write(b,0,len);
             bos.flush();
        }
        bos.close();
        bis.close();
```

#### 优化1：BufferOutput写完最好刷新一下

前面没问题，最后一次可能存不满，要刷新一下给他写出去

也只有缓冲流才能加flush

```
bos.flush();
```

####优化2：针对BufferRead 可以一次读取一行

读取一行的时候，最后判断不能使用-1，要使用null

读取一整行，所以他不会自动换行，需要手动换行

```
while((str = br.readLine())!=null){
    // 换行方式1：
    bw.write(str +"\n");
    //换行方式2：
    bw.newLine();
    bw.flush();
}
```


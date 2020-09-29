# IO转换流

转换流提供了字节流和字符流之间的转换，

当字节流中的数据**都是字符时，转成字符流的操作效率更高**

### 操作流程

![image-20190725232432252](./img/image-20190725232432252.png)

### 复制文件实例

- 编码：字符串 —>字节数组
- 解码：字节数组—>字符串

```
  // 解码
        File file = new File("hello.txt");
        FileInputStream fis = new FileInputStream(file);
        InputStreamReader isr = new InputStreamReader(fis,"UTF-8");
        BufferedReader br = new BufferedReader(isr);
        //编码
        File file2 = new File("cphello2.txt");
        FileOutputStream fos = new FileOutputStream(file2);
        OutputStreamWriter osw = new OutputStreamWriter(fos,"UTF-8");
        BufferedWriter bw = new BufferedWriter(osw);
//        char[] c =new char[1024];
        String str;
        while ((str = br.readLine())!=null){
            bw.write(str);
            bw.newLine();
            bw.flush();
        }
```


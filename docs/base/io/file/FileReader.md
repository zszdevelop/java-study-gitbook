# FileReader

使用FileReader,FileWriter 可以实现文本的复制等

但是对于非文本（视频文件，音频文件，图片）只能使用字节流

### FileReader 的基本使用

```
  File file = new File("hello.txt");
        FileReader fr = new FileReader(file);
        char[] c = new char[24];
        int len;
        while ((len = fr.read(c)) != -1){
            String str = new String(c,0,len);
            System.out.print(str);
        }
        fr.close();
```

### 复制文本文件

```
// 1.输入流对应的文件src 一定要存在，否则抛异常
        // 输出流对应的文件dest 可以不存在，执行过程由程序创建
        FileReader fr = null;
        FileWriter fw = null;
        try {
            File src = new File("hello.txt");
            File dest = new File("cphello.txt");

            fr = new FileReader(src);
            fw = new FileWriter(dest);

            char[] c = new char[24];
            int len;
            while ((len = fr.read(c))!= -1){
                fw.write(c,0,len);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if (fw !=null){
                fw.close();
            }if (fr != null){
                fr.close();
            }
        }
```


# FileInputStream

FileInputStream 是将本地文件读到程序中来

使用**read读**，默认的构造器是**一个字节一个字节读，然后-1的时候就读到文件的结尾**

## 文件读取实例

### 最基本的文件读取

```
	 @Test
    public void test() throws Exception {
        // 1.创建一个File类的对象
        File file = new File("hello.txt");
        // 2.创建一个FileInputStream类对象
        FileInputStream fis = new FileInputStream(file);
        // 3.调用FileInputStream 的方法，实现file文件的读取
        int b = fis.read();
        while (b!= -1){
            System.out.println(b);
            b = fis.read();
        }
        // 4.关闭相应的流
        fis.close();
    }
```

### 赋值语句位置更改

我们可以看到上述代码，fis.read()出现了两次，可以进行一个小的改进

```
        // 3.调用FileInputStream 的方法，实现file文件的读取
//        int b = fis.read();
//        while (b!= -1){
//            System.out.println(b);
//            b = fis.read();
//        }
        int b;
        while ((b =fis.read())!=-1){
            System.out.println((char)b);
        }
```

将int型的强转char，英文没问题，但是中文就会出现乱码

### 使用try-catch处理异常

出了异常也要及时关闭资源

```
 @Test
    public void test2() {
        FileInputStream fis = null;
        // 1.创建一个File类的对象
        try {
            File file = new File("hello.txt");
            // 2.创建一个FileInputStream类对象
             fis = new FileInputStream(file);
            // 3.调用FileInputStream 的方法，实现file文件的读取
            int b;
            while ((b =fis.read())!=-1){
                System.out.println((char)b);
            }
           
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            // 4.关闭相应的流
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```

### *使用read重载方法read(byte[] b)

这样就可以不要一个一个读取

```
 @Test
    public void test3() {
        FileInputStream fis = null;
        // 1.创建一个File类的对象
        try {
            File file = new File("hello.txt");
            // 2.创建一个FileInputStream类对象
            fis = new FileInputStream(file);
            // 3.调用FileInputStream 的方法，实现file文件的读取
            byte[] b  = new byte[8];
            int len;
            while ((len =fis.read(b))!=-1){
                String str = new String(b,0,len);
                System.out.print(str);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            // 4.关闭相应的流
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
```


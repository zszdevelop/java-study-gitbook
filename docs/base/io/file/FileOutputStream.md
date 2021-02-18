# FileOutputStream

```
    @Test
    public void test(){
        // 1.创建一个File对象，表明要写入的文件位置
        File file = new File("hello2.txt");
        // 2.创建一个FileOutputStream的对象，将file的对象作为形参传递给FileOutputStream的构造器中
        FileOutputStream fos =null;
        try {
            fos = new FileOutputStream(file);
            // 3.写入的操作
            fos.write(new String("my test demo").getBytes());
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            //4.关闭输出流
            if (fos !=null){
                try {
                    fos.close();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }
    }
```

## 复制文件

通过FileInputStream 和FileOutputStream 实现复制

```
 // 实现文件复制的方法
    public void copyFile(String src,String dest){
        // 1.提供读入，写出的文件
        File file1 = new File(src);
        File file2 = new File(dest);
        // 2.提供相应的流
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            fis = new FileInputStream(file1);
            fos = new FileOutputStream(file2);
            //3.实现文件的复制
            byte[] b = new byte[1024];
            int len;
            while ((len = fis.read(b))!=-1){
               
                fos.write(b,0,len);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            try {
                fis.close();
                fos.close();
            }catch (Exception e){
                e.printStackTrace();
            }
        }
    }
```


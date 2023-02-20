---
order: 440
category:
  - linux
---

# Linux文件解压

## 1.  tar命令详解

### 1.1 五个独立命令

这五个是独立的命令，压缩解压都要**用到其中一个**，**可以和别的命令连用但只能用其中一个**。

-c: 建立压缩档案

-x：解压

-t：查看内容

-r：向压缩归档文件末尾追加文件

-u：更新原压缩包中的文件

### 1.2 可选命令

下面的参数是根据需要在压缩或解压档案时可选的。

-z：有gzip属性的

-j：有bz2属性的

-Z：有compress属性的

-v：显示所有过程

-O：将文件解开到标准输出

### 1.3 最后一个必须参数-f

-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。

## 2. 常用解压

**压缩**

```sh
tar –cvf jpg.tar *.jpg       // 将目录里所有jpg文件打包成 tar.jpg 
tar –czf jpg.tar.gz *.jpg    // 将目录里所有jpg文件打包成 jpg.tar 后，并且将其用 gzip 压缩，生成一个 gzip 压缩过的包，命名为 jpg.tar.gz 
tar –cjf jpg.tar.bz2 *.jpg   // 将目录里所有jpg文件打包成 jpg.tar 后，并且将其用 bzip2 压缩，生成一个 bzip2 压缩过的包，命名为jpg.tar.bz2 
tar –cZf jpg.tar.Z *.jpg     // 将目录里所有 jpg 文件打包成 jpg.tar 后，并且将其用 compress 压缩，生成一个 umcompress 压缩过的包，命名为jpg.tar.Z 
rar a jpg.rar *.jpg          // rar格式的压缩，需要先下载 rar for linux 
zip jpg.zip *.jpg            // zip格式的压缩，需要先下载 zip for linux
```

**解压**

```sh
tar –xvf file.tar         // 解压 tar 包 
tar -xzvf file.tar.gz     // 解压 tar.gz 
tar -xjvf file.tar.bz2    // 解压 tar.bz2 
tar –xZvf file.tar.Z      // 解压 tar.Z 
unrar e file.rar          // 解压 rar 
unzip file.zip            // 解压 zip 
```



## 2. 7z 操作



1. 安装

   ```
   yum install p7zip
   ```

2.  压缩

   ```
   7za a 压缩包.7z 被压缩文件或目录
   ```

3. 解压

   ```
   #将压缩包解压到指定目录，注意：指定目录参数-o后面不要有空格
   7za x 压缩包.7z -o解压目录
   #将压缩包解压到当前目录
   7za x 压缩包.7z
   ```
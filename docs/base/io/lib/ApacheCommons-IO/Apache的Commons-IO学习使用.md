# Apache的Commons-IO学习使用

## 1. 概述

Commons IO是针对开发IO流功能的工具类库。common-io 的架构如下

![image-20211016134906213](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20211016134906213.png)



## 2. **FileUtils**

FileUtils类包含使用File对象的工具方法。包括读写、复制和比较等等。

### 2.1 读文件

```java
   public static void main(String[] args) throws IOException {
       File file = new File("/application.properties");
       List<String> lines = FileUtils.readLines(file, "UTF-8");

       System.out.println(lines);
   }
```

### 2.2 读取文件大小

byteCountToDisplaySize：挺人性化的一个方法，可以吧字节数组的长度，转化成用户良好的单位，如EB、GB、MB、KB、bytes等等

```java
   public static void main(String[] args) throws Exception {
        try (InputStream in1 = new URL("http://commons.apache.org").openStream()) {
            String s = FileUtils.byteCountToDisplaySize(IOUtils.toByteArray(in1).length);
            System.out.println(s); //26 KB
        }
    }
```

### 2.3 其他常用操作

- checksum、checksumCRC32：类似于校验MD5和。如

  `long csum = FileUtils.checksum(file, new CRC32()).getValue();`,一般下载来一个文件后，为了安全可以校验一把

- cleanDirectory：把指定文件夹里面的东西全部删除掉
- contentEquals：依赖于IOUtils.contentEquals
- convertFileCollectionToFileArray：把File的集合转换为File的数组
- copyDirectory(srcDir,destDir,FileFilter)：吧src的文件夹内容copy（或者剪切）到dest里面，可以使用FileFilter过滤
- copyFile：可以一个文件copy到另外一个文件，也可以copy到outputStream里面。
- copyFileToDirectory：
- copyInputStreamToFile：
- copyURLToFile：
- deleteDirectory：递归删除这个文件夹里面的所有东西（包括文件夹自己）
- deleteQuietly：既可以删除文件，也可以递归删除文件夹
- directoryContains：指定文件夹下是否包含某个文件
- forceDelete：强制删除一个文件。如果是文件夹，也会递归删除掉。
- forceMkdir：强制创建一个目录
- getTempDirectoryPath：拿到IO的临时文件夹路径
- isFileNewer、isFileOlder：判断该文件的最后修改时间，是否新于给定的Date时间（或者给定文件的lastModified）
- listFiles、listFilesAndDirs：拿到指定文件夹下所有的文件
- moveDirectory、moveFile
- openInputStream：效果同new FileInputStream
- openOutputStream：同上
- readFileToByteArray、readFileToString、readLines
- sizeOf、sizeOfAsBigInteger、：拿到文件/文件夹的大小
- sizeOfDirectory、sizeOfDirectoryAsBigInteger
- toFile（URL url）：把网络上的资源字节编程一个文件
- write、writeByteArrayToFile、writeLines、writeStringToFile：把传入的data串写入到File里面

## 3. IOUtils

IOUtils包含处理读、写和复制的工具方法。方法对InputStream、OutputStream、Reader和Writer起作用。

### 3.1 常用操作

- buffer：一句话可以吧inputStream、outputStream、Reader、Witter等包装成带缓冲区的流，提高效率
- closeQuietly：可以关闭各种流、socket等任何closeable的实例（不过官方推荐使用try-with-resources来代替）
- contentEquals：比较两个InputStream或者两个Reader里面的内容（字节流）是否完全相同
- copy：流的互相拷贝。可以将输入流拷到输出流。`copy(final InputStream input, final OutputStream output, final int bufferSize)`,Reader拷贝到Writer等等
- copyLarge：当你的流拷贝的是大文件（一般大于2G级别），请使用此方法拷贝
- read、readFully：把输入流的东西读取添加到第二个参数中的字节数组里
- readLines：不解释
- resourceToByteArray、resourceToString：直接传入一个文件的路径，读取进来
- toBufferedInputStream：把普通的inputStream转换成带缓冲区的，返回一个新的InputStream
- toByteArray：吧输入流转换到字节数组
- toCharArray：
- toInputStream：吧字符、字符串等等直接读到流里
- toString：强大的方法，可以吧各种输出流读成一个串
- write、writeChunked、writeLines：把传入的字节数组，写入到输出流里（可指定编码）

## 4. FilenameUtils

FilenameUtils类包含工具方法不需要使用File对象就可以操作文件名。该类致力于屏蔽Unix和Windows之间的不同，避免这些环境之间的转换（例如，从开发到生产）。  开发在windows、生产在Linux

一般使用较少，这里不做过多介绍.

## 5. LineIterator：行迭代器

提供灵活的方式使用一个基于行的文件。可以直接，或通过FileUtils或IOUtils的工厂方法创建实例。推荐使用模式：

备注：也是需要close的

## 6.Filefilter

包含IOFileFilter、FilenameFilter等。可以在copy、remove等等操作的时候，对文件进行各种过滤行为

此包自带一些常用的Filter如：AgeFileFilter、CanReadFileFilter、CanWriteFileFilter、DirectoryFileFilter、EmptyFileFilter、HiddenFileFilter等等。基本能满足我们所有需求

## 7.比较器

#### 比如按照文件名倒序、文件大小倒序这种需求，用此比较器会非常方便。也内置了很多的比较器实现

如：SizeFileComparator、ReverseComparator、LastModifiedFileComparator、ExtensionFileComparator等等

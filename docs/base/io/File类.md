# File类

file对应一个物理文件

1. Java中新建或者删除一个文件,文件夹以及createNewFile(),delete(),mkdir(),mkdirs()函数

2. 判断文件的函数：exists(),isFile(),isAbsolute(),isDirectory(),canRead(),canWrite(),isHidden()函数
3. 文件属性的函数：lastModified(),length(),list(),listFiles(),renameTo()，getName(),getParent(),getPath(),getAbsolutePath()，delete()函数

## mkdir() 和mkdirs() 区别

java.io.File.mkdir()：只能创建一级目录，且父目录必须存在，否则无法成功创建一个目录。

java.io.File.mkdirs()：可以创建多级目录，父目录不一定存在。


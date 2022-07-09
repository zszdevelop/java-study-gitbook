# aspose.word for java 破解使用

## 1. 简介

最近由于项目中需要用到word转换为pdf文档，综合了市面上所有的方案后，最后选择使用Aspose.Words方案。该产品是国外的，商用的话需要在官网申请license。本文主要阐述如何简单的进行试用，不推荐商用。如有开发者采用本文方法进行商业用途，一切责任和损失均与本文无关。

## 2.  aspose.word 21.6 破解

###  2.1 破解原理

com.aspose.words.zzXyu 类下的 zzZXG 与破解有关，我们通过反射动态替换掉他

![image-20220519234946302](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220519234946302.png)

>也不知道是哪个大佬最先发现的，太强了

### 2.2 byte[] 含义

```
// 默认的含义：EVALUATION 评价/评估
public static final byte[] zzZXG = new byte[]{69, 86, 65, 76, 85, 65, 84, 73, 79, 78};
// 更改后的含义：LICENSED 许可
byte[] bytes = {76, 73, 67, 69, 78, 83, 69, 68};
```

### 2.3 破解

在执行转换前

```java
  try{
            Class<?> aClass = Class.forName("com.aspose.words.zzXyu");
            java.lang.reflect.Field zzZXG = aClass.getDeclaredField("zzZXG");
            zzZXG.setAccessible(true);

            java.lang.reflect.Field modifiersField = zzZXG.getClass().getDeclaredField("modifiers");
            modifiersField.setAccessible(true);
            modifiersField.setInt(zzZXG, zzZXG.getModifiers() & ~Modifier.FINAL);
            zzZXG.set(null,new byte[]{76, 73, 67, 69, 78, 83, 69, 68});
        }catch (Exception e){
            e.printStackTrace();
            log.error("apose word 破解异常");
        }
```

## 3 aspose.word 21.11 破解

[Aspose.Words for Java21.11去除水印和数量限制](https://juejin.cn/post/7034387646168186894)

### 3.1 分析

直接看参考文章

### 3.2 破解

#### 3.2.1添加Javassist修改class字节码文件

```xml
<dependency>
    <groupId>org.javassist</groupId>
    <artifactId>javassist</artifactId>
    <version>3.28.0-GA</version>
</dependency>
```

#### 3.2.2 添加修改方法

```java
/**
 * 修改words jar包里面的校验
 */
public static void modifyWordsJar() {
    try {
        //这一步是完整的jar包路径,选择自己解压的jar目录
        ClassPool.getDefault().insertClassPath("D:\\aspose-words-21.11.0-java\\lib\\aspose-words-21.11.0-jdk17.jar");
        //获取指定的class文件对象
        CtClass zzZJJClass = ClassPool.getDefault().getCtClass("com.aspose.words.zzXDb");
        //从class对象中解析获取指定的方法
        CtMethod[] methodA = zzZJJClass.getDeclaredMethods("zzY0J");
        //遍历重载的方法
        for (CtMethod ctMethod : methodA) {
            CtClass[] ps = ctMethod.getParameterTypes();
            if (ctMethod.getName().equals("zzY0J")) {
                System.out.println("ps[0].getName==" + ps[0].getName());
                //替换指定方法的方法体
                ctMethod.setBody("{this.zzZ3l = new java.util.Date(Long.MAX_VALUE);this.zzWSL = com.aspose.words.zzYeQ.zzXgr;zzWiV = this;}");
            }
        }
        //这一步就是将破译完的代码放在桌面上
        zzZJJClass.writeFile("C:\\Users\\roc\\Desktop\\");

        //获取指定的class文件对象
        CtClass zzZJJClassB = ClassPool.getDefault().getCtClass("com.aspose.words.zzYKk");
        //从class对象中解析获取指定的方法
        CtMethod methodB = zzZJJClassB.getDeclaredMethod("zzWy3");
        //替换指定方法的方法体
        methodB.setBody("{return 256;}");
        //这一步就是将破译完的代码放在桌面上
        zzZJJClassB.writeFile("C:\\Users\\roc\\Desktop\\");
    } catch (Exception e) {
        System.out.println("错误==" + e);
    }
}
```

运行修改方法后会在桌面生成 com 修改后的文件夹

#### 3.2.3. 修改jar包里面的数据

为了不修改原jar包建议复制一份重命名。

1. 打开jar包将桌面com文件夹覆盖到jar包com文件夹

   ![image-20220629165728881](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629165728881.png)

2. 删除jar包里面的`.RSA`和`.SF`文件

   ![image-20220629165758000](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220629165758000.png)

### 3.3 重新导入修改后的jar包进行测试

1. maven移除旧的jar包，导入修改后的jar包
2. 调用测试方法进行测试转换后的文件是否去除水印和数量限制成功

```java
String sourceFile = "D:\\b.doc";//输入的文件
String targetFile = "D:\\转换后.pdf";//输出的文件
/**
 * Word转PDF操作
 *
 * @param sourceFile 源文件
 * @param targetFile 目标文件
 */
public static void doc2pdf(String sourceFile, String targetFile) {
    try {
        long old = System.currentTimeMillis();
        FileOutputStream os = new FileOutputStream(targetFile);
        com.aspose.words.Document doc = new com.aspose.words.Document(sourceFile);
        doc.save(os, com.aspose.words.SaveFormat.PDF);
        os.close();
        long now = System.currentTimeMillis();
        System.out.println("共耗时：" + ((now - old) / 1000.0) + "秒");  //转化用时
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 3.4 破解的jar包

如果觉得繁琐，可以直接从我处理好的下载

链接:https://pan.baidu.com/s/1wmd--zPotNz1Mnl1waDP_g  密码:upj6

## 参考文章

[**aspose word for java 21.6 破解使用**](https://blog.51cto.com/u_15144750/4692930)

[Aspose.Words for java 21.1 破解步骤](https://blog.csdn.net/xxw19950701/article/details/115724571)

[Aspose.Words for Java21.11去除水印和数量限制](https://juejin.cn/post/7034387646168186894)
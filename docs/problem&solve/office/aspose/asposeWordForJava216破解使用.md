# aspose word for java 21.6 破解使用

## 1. 简介

最近由于项目中需要用到word转换为pdf文档，综合了市面上所有的方案后，最后选择使用Aspose.Words方案。该产品是国外的，商用的话需要在官网申请license。本文主要阐述如何简单的进行试用，不推荐商用。如有开发者采用本文方法进行商业用途，一切责任和损失均与本文无关。

## 2. 破解原理

com.aspose.words.zzXyu 类下的 zzZXG 与破解有关，我们通过反射动态替换掉他

![image-20220519234946302](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220519234946302.png)

>也不知道是哪个大佬最先发现的，太强了

### 2.1 byte[] 含义

```
// 默认的含义：EVALUATION 评价/评估
public static final byte[] zzZXG = new byte[]{69, 86, 65, 76, 85, 65, 84, 73, 79, 78};
// 更改后的含义：LICENSED 许可
byte[] bytes = {76, 73, 67, 69, 78, 83, 69, 68};
```



## 3. 破解

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

## 参考文章

[**aspose word for java 21.6 破解使用**](https://blog.51cto.com/u_15144750/4692930)

[Aspose.Words for java 21.1 破解步骤](https://blog.csdn.net/xxw19950701/article/details/115724571)
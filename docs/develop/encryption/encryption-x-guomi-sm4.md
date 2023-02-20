# 国密SM4加密使用（java 和 vue）

## 1. 背景

公司业务需求国产加密，要求使用国密SM4

特别注意：

- 加密串的编码GBK 和 utf8 是有区别的

- 前后端的参数要严格保持统一

  ![image-20210928152557678](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210928152557678.png)

## 2. java后端集成

### 2.1 添加pom依赖

```xml
 <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.3.8</version>
        </dependency>
 
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcprov-jdk15to18</artifactId>
            <version>1.66</version>
        </dependency>

```

### 2.2 编写测试类

```java
import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.crypto.symmetric.SM4;
import cn.hutool.crypto.symmetric.SymmetricCrypto;
 
import static cn.hutool.crypto.Mode.CBC;
import static cn.hutool.crypto.Padding.ZeroPadding;
 
public class Sm4EncryptUtil {
 
    public static String encrypt(String plainTxt){
        String cipherTxt = "";
        SymmetricCrypto sm4 = new SM4(CBC, ZeroPadding, "abc1111111111333".getBytes(CharsetUtil.CHARSET_UTF_8), "iviviviviviviviv".getBytes(CharsetUtil.CHARSET_UTF_8));
        byte[] encrypHex = sm4.encrypt(plainTxt);
        cipherTxt = Base64.encode(encrypHex);
        return "{SM4}" + cipherTxt;
    }
 
    public static String decrypt(String cipherTxt){
        if(!cipherTxt.startsWith("{SM4}")){
            return cipherTxt;
        }
        cipherTxt = cipherTxt.substring(5);
        String plainTxt = "";
        SymmetricCrypto sm4 = new SM4(CBC, ZeroPadding, "abc1111111111333".getBytes(CharsetUtil.CHARSET_UTF_8), "iviviviviviviviv".getBytes(CharsetUtil.CHARSET_UTF_8));
        byte[] cipherHex = Base64.decode(cipherTxt);
        plainTxt = sm4.decryptStr(cipherHex, CharsetUtil.CHARSET_UTF_8);
        return plainTxt;
    }
 
    public static void main(String[] argc){
        String originTxt = "测试";
        System.out.println("原文: " + originTxt);
        String cipherTxt = encrypt(originTxt);
        System.out.println("密文: " + cipherTxt);
        String plainTxt = decrypt(cipherTxt);
        System.out.println("解密结果: " + plainTxt);
    }
}
```

## 3. vue实现

### 3.1 添加依赖

```
npm install gm-crypt 
```

### 3.2 代码实现

```js
export default {
  components: {},
  props: {},
  data() {
    return {
      Account: "", //用户账号
      Pwd: "", //用户密码
      time: ""
    };
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    // 登录
    login() {
      // 引用sm4包进行加密
      const SM4 = require("gm-crypt").sm4;
      let sm4Config = {
        //配置sm4参数
        key: "HENG1AN2WEN3YIN4",//这里这个key值是跟后端要的
        mode: "ecb", // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
        cipherType: "base64" // 
      };

      let sm4 = new SM4(sm4Config);//这里new一个函数，将上面的sm4Config作为参数传递进去。然后就可以开心的加密了
      let Account = sm4.encrypt(this.Account); //账号加密
      let Pwd = sm4.encrypt(this.Pwd); //密码加密

```

## 4. 在线测试

[在线测试网站](https://the-x.cn/cryptography/Sm4.aspx)

![image-20210928152433988](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/image-20210928152433988.png)

## 参考文章

[SM4加解密算法工具类JAVA实现（基于hutool-all以及bcprov-jdk15to18实现） 支持MODE以及自定义Key以及iv的设定](https://blog.csdn.net/ljzgood/article/details/117966293)

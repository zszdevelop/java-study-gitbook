# JWT详解

### 什么是JWT

**JWT（JSON Web Token）  本质上就一段签名的 JSON 格式的数据。由于它是带有签名的，因此接收者便可以验证它的真实性。**

JWT 由3部分构成

例如：

```java
xxxxx.yyyyy.zzzzz
```

1. Header：描述JWT 的元数据。定义了生成签名的算法以及token的类型

   ```json
   {
        'typ':'JWT', //宣告型別，這裡是jwt
        'alg':'HS256'  //宣告加密的演算法，通常直接使用HMAC SHA256或RSA
   }
   ```

   Header部分的JSON被Base64Url編碼，形成JWT的第一部分。

   ```
   eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
   ```

2. Payload（负载）：用来存放实际需要传递的数据

   定义了三种宣告

   - Registered claims（註冊宣告）:

     這些是一組預先定義的宣告，它們不是強制性的，但推薦使用，以提供一組有用的，可互操作的宣告。 其中一些是：iss（發行者），exp（到期時間），sub（主題），aud（受眾）等。

   - Public claims（公開宣告）:

     這些可以由使用JWT的人員隨意定義。 但為避免衝突，應在IANA JSON Web令牌登錄檔中定義它們，或將其定義為包含防衝突名稱空間的URI。

   - Private claims（私有宣告）:

     這些是為了同意使用它們但是既沒有登記，也沒有公開宣告的各方之間共享資訊，而建立的定製宣告。
     示例（這裡存放的即使一個使用者的資訊，沒有到期時間、主題之類的宣告）：

   例如这是我实际存储的值

   ```json
   {"exp":1571370401,"username":"zsz"}
   ```

   Playload部分的JSON被Base64Url編碼，形成JWT的第二部分。

   ```
   eyJleHAiOjE1NzEzNzA0MDEsInVzZXJuYW1lIjoienN6In0
   ```

   此部分信息尽管受到篡改保护，但是任何人都可以阅读。这部分不要放任何关键信息

3. Signature（签名）：服务器通过Payload、Header 和一个密钥（secret）使用Header里面指定的算法签名（默认是HMAC SHA256）生成

   如果你想使用HMAC SHA256演算法，簽名將按照以下方式建立：

   ```java
   HMACSHA256(
     base64UrlEncode(header) + "." +
     base64UrlEncode(payload) + "." +
     secret)  
   ```

## 2. JWT 安全吗？

Base64 编码方式是可逆的，也就是透过编码后开放的token **内容是可以被解析的**。一般我们不能放敏感信息，如密码等

## 3. JWT Payload 內容可以被偽造嗎？

JWT 其中一个组成内容是Signature，可以防止通过Base64可逆回推有效负荷内容，因为signature 是你Header和payload一起base64组成的



### 参考文章

[通俗易懂版講解JWT和OAuth2，以及他倆的區別和聯絡（Token鑑權解決方案）](<https://www.itread01.com/content/1542396010.html>)
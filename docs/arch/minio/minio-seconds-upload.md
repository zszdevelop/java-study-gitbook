---
order: 240
category:
  - Minio
---

# Minio进阶 - Minio秒传

## 1. MD5秒传

### 1.1 摘要算法

摘要算法是一种能产生特殊输出格式的算法，这种算法的特点是：无论用户输入什么长度的原始数据，经过计算后输出的密文都是固定长度的，这种算法的原理是根据一定的运算规则对原数据进行某种形式的提取，这种提取就是摘要，被摘要的数据内容与原数据有密切联系，只要原数据稍有改变，输出的“摘要”便完全不同，因此，基于这种原理的算法便能对数据完整性提供较为健全的保障。

但是，由于输出的密文是提取原数据经过处理的定长值，所以它已经不能还原为原数据，即消息摘要算法是不可逆的，理论上无法通过反向运算取得原数据内容，因此它通常只能被用来做数据完整性验证。

摘要算法:

- MD2
- MD5
- SHA-1
- SHA-256
- SHA-384
- SHA-512

### 1.2 MD5加密

MD5即Message-Digest Algorithm 5（信息-摘要算法 5），用于确保信息传输完整一致。是计算机广泛使用的杂凑算法之一（又译摘要算法、哈希算法），主流编程语言普遍已有MD5实现。

任意长度的数据经过MD5加密后得到的值的长度都是固定的，并且对原数据修改一个字符对于加密后的值都有很大的变动。

比如使用hutool工具类对字符串进行加密：

```java
    Digester md5 = new Digester(DigestAlgorithm.MD5);
    String digestHex = md5.digestHex("testStr");
    System.out.println(digestHex);// 32e3f38e0012b78faf9b7d1adb34cb48
```
也可以对文件进行加密：

```java
    Digester md5 = new Digester(DigestAlgorithm.MD5);
    File file=new File("F:\\AuthUser.java");
    String digestHex = md5.digestHex(file);
    System.out.println(digestHex);// 835bb25fab66d6fc70ea497f49363194
```
总结：MD5是一种摘要加密算法，可以对文件、字符串等进行加密规则运算，然后得到一个固定长度的字符串，如果数据有一点修改，加密后的密文就不一样。

### 1.3 MD5秒传

**MD5秒传的基本原理**：在实际文件上传应用场景中，当文件体积大、量比较多时，可以对上传前做文件md5值验证，查看该文件是否已上传过，如果已上传，则直接显示上传成功，返回之前文件的访问链接，如果未上传过，则再执行上传。

## 2. 入门案例

### 2.1 搭建前端项目

前端上传组件使用的是[vue-uploader](https://github.com/simple-uploader/vue-uploader)。

创建一个VUE 项目，将官网中的测试案例复制进来：

![image-20221001232458133](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221001232458133.png)

修改`main.js`中的一段代码：

```java
import uploader from 'vue-simple-uploader';
```

修改App.vue 中上传地址为之前我们写的[Minio](https://so.csdn.net/so/search?q=Minio&spm=1001.2101.3001.7020) 上传地址：

![image-20221001232532357](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221001232532357.png)

关闭自动上传：

```html
<uploader ref="uploader" :auto-start="false" :options="options" :file-status-text="statusText" class="uploader-example" @file-complete="fileComplete" @complete="complete" />
```

然后启动项目：

```bash
npm install vue-simple-uploader --save
cnpm install 
npm run start
```


访问主页地址，测试上传文件：

![image-20221001232628653](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221001232628653.png)

### 2.2 集成SparkMD5

[文档地址](https://www.npmjs.com/package/spark-md5)

SparkMD5 是 MD5 算法的快速 md5 实现。该脚本基于 JKM md5 库，这是最快的算法。

安装：

```bash
npm install spark-md5 --save
```

在App.vue中引入SparkMD5 ，onFileAdded 添加文件事件中，调用计算MD5方法computeMD5：

```html
<script>
import SparkMD5 from 'spark-md5';
export default {
  data () {
    return {
      options: {
        // 目标上传 URL，可以是字符串也可以是函数，如果是函数的话，则会传入 Uploader.File 实例、当前块 Uploader.Chunk 以及是否是测试模式，默认值为 '/'
        target: '//localhost:8081/file/upload', // '//jsonplaceholder.typicode.com/posts/',
        // 是否测试每个块是否在服务端已经上传了，主要用来实现秒传、跨浏览器上传等，默认 true。
        testChunks: false,
        // 分块时按照该值来分。最后一个上传块的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小，
        // 可见这个 Issue #51，默认 1*1024*1024。
        chunkSize: 100 * 1024 * 1024
      },
      attrs: {
        accept: 'image/*'
      },
      statusText: {
        success: '成功了',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader;
    });
  },
  methods: {
    onFileAdded(file) {
      console.log('文件被添加：' + file.name);
      this.panelShow = true;
      // 计算MD5
      this.computeMD5(file, this.options.chunkSize);
    },
    /**
     * 计算文件的MD5 值
     */
    computeMD5(file, chunkSize) {
      console.log('开始计算MD5', file);
      const fileReader = new FileReader();
      const time = new Date().getTime();
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunks = Math.ceil(file.size / chunkSize);
      const spark = new SparkMD5.ArrayBuffer();
      file.pause();
      loadNext();
      fileReader.onload = e => {
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
        } else {
          const md5 = spark.end();
          file.uniqueIdentifier = md5;
          file.resume();
          console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
        }
      };
      fileReader.onerror = function () {
        this.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
      };
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },
    complete () {
      console.log('complete', arguments);
    },
    fileComplete () {
      console.log('file complete', arguments);
    }
  }
};
</script>
```

添加几个文件，可以在控制台中看到打印的文件MD5信息：

![image-20221001232850838](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221001232850838.png)

查看上传文件接口，可以看到，将MD5 传给了后台。

![image-20221001232907340](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20221001232907340.png)

### 2.3 后台代码

既然前端计算出MD5已经穿了过来，就比较简单了，只需要在保存文件之前判断，该文件的MD5 是否已存在，若存在直接返回之前的访问路径，不存在则再执行上传操作。

```java
 @RequestMapping("/upload")
    @ResponseBody
    public Object upload(MultipartFile file, String bucketName, HttpServletRequest request) throws IOException {
        // MD5 秒传
        // 1. 获取到该文件的MD5
        String md5 = request.getParameter("uniqueIdentifier");
        // 2. 判断该MD5 是否已存在
        boolean contains = md5Set.contains(md5);
        // 3. 已存在直接返回访问路径
        if (contains) {
            return "该文件已上传，链接为：" + "http:xxxxxxxxxxxx";
        } else {
            // 4. 不存在则执行上传并保存MD5 记录到数据库
            OssFile ossFile = minioTemplate.putObject(file.getInputStream(), bucketName, file.getOriginalFilename());
            md5Set.add(md5);
            return ossFile;
        }
    }
```

## 3. 案例存在的问题

入门案例中，存在不少问题，实际开发时自行解决：

- 应该在上传之前进行MD5校验，单独写一个校验接口，而不是上传的过程中校验

## 参考文章

[Minio入门系列【17】MD5秒传原理及入门案例](https://yunyanchengyu.blog.csdn.net/article/details/123393489)
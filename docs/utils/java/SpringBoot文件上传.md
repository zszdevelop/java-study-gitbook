# SpringBoot文件上传

## 1. 服务端代码实现

### 1.1 创建springboot项目

### 1.2 配置文件上传的文件大小限制

`application.properties`配置文件添加：

```yml
# 上传文件总的最大值
spring.servlet.multipart.max-request-size=10MB
# 单个文件的最大值
spring.servlet.multipart.max-file-size=10MB
```

- `spring.servlet.multipart.max-file-size`限制单个文件的最大值
- `spring.servlet.multipart.max-request-size`限制上传的多个文件的总大小

### 1.3 上传文件controller

#### 1.3.1 方式1(推荐)： MultipartHttpServletRequest

MultipartHttpServletRequest是对，使其能够很好地处理文件上传。HttpServletRequest接口进行扩展

>在MultipartFile接口中定义了如下很多有用的方法。
>
>- 使用getSize()方法获得文件长度，以此决定允许上传的文件大小。
>
>- 使用isEmpty()方法判断上传文件是否为空文件，以此决定是否拒绝空文件。
>
>- 使用getInputStream()方法将文件读取为java.io.InputStream流对象。
>
>- 使用getContentType()方法获得文件类型，以此决定允许上传的文件类型。
>
>- 使用transferTo（dest）方法将上传文件写到服务器上指定的文件。



```java
@RestController
public class UploadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);

    @PostMapping(value = "fileUpload")
    public String createZjclxx(MultipartHttpServletRequest request){
        String filePath = "/Users/zsz/Project/demo/2021year/6yue/UploadDemo/temp/";
        try{
            MultiValueMap<String, MultipartFile> map = request.getMultiFileMap();
            List<MultipartFile> files = map.get("file");
            for (int i=0;i< files.size();i++ ){
                MultipartFile multipartFile = files.get(i);
                    String fileName = multipartFile.getOriginalFilename();
                    File dest = new File(filePath + fileName);
                    try {
                        multipartFile.transferTo(dest);
                        LOGGER.info("第" + (i + 1) + "个文件上传成功");
                    } catch (IOException e) {
                        LOGGER.error(e.toString(), e);
                        return "上传第" + (i++) + "个文件失败";
                    }
                }

        }catch (Exception e){
            e.printStackTrace();
        }
        return "上传成功";
    }


}
```

#### 1.3.2 方式二：HttpServletRequest

```java

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class UploadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);


    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "上传失败，请选择文件";
        }

        String fileName = file.getOriginalFilename();
        String filePath = "/Users/zsz/Project/demo/2021year/6yue/UploadDemo/temp/";
        File dest = new File(filePath + fileName);
        try {
            file.transferTo(dest);
            LOGGER.info("上传成功");
            return "上传成功";
        } catch (IOException e) {
            LOGGER.error(e.toString(), e);
        }
        return "上传失败！";
    }

    @PostMapping("/multiUpload")
    @ResponseBody
    public String multiUpload(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String filePath = "/Users/zsz/Project/demo/2021year/6yue/UploadDemo/temp/";
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file.isEmpty()) {
                return "上传第" + (i++) + "个文件失败";
            }
            String fileName = file.getOriginalFilename();

            File dest = new File(filePath + fileName);
            try {
                file.transferTo(dest);
                LOGGER.info("第" + (i + 1) + "个文件上传成功");
            } catch (IOException e) {
                LOGGER.error(e.toString(), e);
                return "上传第" + (i++) + "个文件失败";
            }
        }

        return "上传成功";

    }

}
```

## 2. postman测试

- 单文件上传

  ![image-20210604175741964](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210604175741964.png)

- 多文件上传

  ![image-20210604175942400](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210604175942400.png)

## 参考文章

[Spring Boot教程(十三)：Spring Boot文件上传](https://blog.csdn.net/gnail_oug/article/details/80324120)


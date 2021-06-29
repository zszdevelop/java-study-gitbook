# SpringBoot文件下载

## 1. 简介

涉及到文件下载、打包压缩下载。记录实现代码

## 2. 代码

### 2.1 Controller 层

```java
package com.zszdevelop.uploaddemo.controller;

import com.zszdevelop.uploaddemo.service.DownLoadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * @description 文件下载controller
 **/
@RestController
@RequestMapping("/file")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private DownLoadService downLoadService;

    /**
     * 单个文件下载
     *
     * @param fileName 真实存在的文件名
     */
    @GetMapping("/down-one")
    public void downOneFile(@RequestParam(value = "filename", required = false) String fileName) {
        logger.info("单个文件下载接口入参:[filename={}]", fileName);
        if (fileName.isEmpty()) {
            return;
        }
        try {
            downLoadService.downOneFile(fileName);
        } catch (Exception e) {
            logger.error("单个文件下载接口异常:{fileName={},ex={}}", fileName, e);
        }
    }

    /**
     * 批量打包下载文件
     *
     * @param fileName 文件名，多个用英文逗号分隔
     */
    @GetMapping("/down-together")
    public void downTogether(@RequestParam(value = "filename", required = false) String fileName) {
        logger.info("批量打包文件下载接口入参:[filename={}]", fileName);
        if (fileName.isEmpty()) return;
        List<String> fileNameList = Arrays.asList(fileName.split(","));
        if (CollectionUtils.isEmpty(fileNameList)) return;
        try {
            downLoadService.downTogetherAndZip(fileNameList);
        } catch (Exception e) {
            logger.error("批量打包文件下载接口异常:{fileName={},ex={}}", fileName, e);
        }
    }
}
```

### 2.2 Service层

```java

import java.util.List;

public interface DownLoadService {

    void downOneFile(String fileName) throws Exception;

    void downTogetherAndZip(List<String> fileNameList) throws Exception;
}
```

```java
package com.zszdevelop.uploaddemo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class DownLoadServiceImpl
    implements DownLoadService {

        private static final Logger logger = LoggerFactory.getLogger(DownLoadServiceImpl.class);

        @Value("${file.path}")
        private String FILE_ROOT_PATH;

        /**
         * 单个文件下载
         *
         * @param fileName 单个文件名
         * @throws Exception
         */
        @Override
        public void downOneFile(String fileName) throws Exception {
            HttpServletResponse resp = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
            File file = new File(FILE_ROOT_PATH + fileName);
            if (file.exists()) {
                resp.setContentType("application/x-msdownload");
                resp.setHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes(), "ISO-8859-1"));
                InputStream inputStream = new FileInputStream(file);
                ServletOutputStream ouputStream = resp.getOutputStream();
                byte b[] = new byte[1024];
                int n;
                while ((n = inputStream.read(b)) != -1) {
                    ouputStream.write(b, 0, n);
                }
                ouputStream.close();
                inputStream.close();
            }
        }

        /**
         * 文件批量打包下载
         *
         * @param fileNameList 多个文件名，用英文逗号分隔开
         * @throws IOException
         */
        @Override
        public void downTogetherAndZip(List<String> fileNameList) throws IOException {
            HttpServletResponse resp = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
            resp.setContentType("application/x-msdownload");
            //暂时设定压缩下载后的文件名字为test.zip
            resp.setHeader("Content-Disposition", "attachment;filename=test.zip");
            String str = "";
            String rt = "\r\n";
            ZipOutputStream zos = new ZipOutputStream(resp.getOutputStream());
            for (String filename : fileNameList) {
                str += filename + rt;
                File file = new File(FILE_ROOT_PATH + filename);
                zos.putNextEntry(new ZipEntry(filename));
                FileInputStream fis = new FileInputStream(file);
                byte b[] = new byte[1024];
                int n = 0;
                while ((n = fis.read(b)) != -1) {
                    zos.write(b, 0, n);
                }
                zos.flush();
                fis.close();
            }
            //设置解压文件后的注释内容
            zos.setComment("download success:" + rt + str);
            zos.flush();
            zos.close();
        }

}

```

## 3. 参考

[java实现文件打包压缩下载接口](https://blog.csdn.net/fanrenxiang/article/details/95168890)
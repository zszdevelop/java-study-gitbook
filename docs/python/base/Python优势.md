# Python优势

## 2. 学习过程中感悟的python强大之处

1. 文件处理强大

   ```
   with open('index.html', 'wb') as f:
       f.write(req.content)
   ```

   以上代码就直接保存文件，也不需要异常处理，关闭流等操作
# mongoDB模糊查询

## 1.%xx%

- sql:

  ```sql
   select * from user where name like "%花%";
  ```

- mongo:

  ```sql
  db.user.find(name:/花/);
  ```

## 2.xx%

- sql:

  ```sql
  select * from user where name like "花%";
  ```

- mongo:

  ```sql
  db.user.find(name:/^花/);
  ```

## 3.不区分大小写

    ```
db.user.find(name:/a/i);
    ```

## 参考文章

[mongoDB 模糊查询](https://www.jianshu.com/p/030a593a2751)


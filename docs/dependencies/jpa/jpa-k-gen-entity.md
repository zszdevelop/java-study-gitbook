# IDEA下SpringData-JPA根据数据库表生成实体类

1. 首先要给项目的Modules添加JPA:

   ![image-20201120100921592](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120100921592.png)

   ![image-20201120101005602](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120101005602.png)

2. 数据源的配置

   View --> Tool Windows下看到 database

   ![image-20201120103112676](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120103112676.png)

3. 完成上述操作后即可在View --> Tool Windows下看到 Persistence选项,将其打开

   ![image-20201120101142287](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120101142287.png)

   ![image-20201120103153121](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120103153121.png)

   ![image-20201120103244179](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120103244179.png)

3. 在弹出的Persistence窗口的项目上右键,选择Generate Persistence Mapping --> By Database Schema

   ![image-20201120101503223](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120101503223.png)

4. 在此处进行数据库相关配置,配置成功后即可在下方看到数据库中的表

![image-20201120103333205](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20201120103333205.png)


# linux安装mongoDB

## 1.下载linux版本mongoDB

访问mongoDB官网，选择对应版本[mongodb官网](https://www.mongodb.com/try/download/community)

![image-20210406231806650](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406231806650.png)

选择对应的版本

## 2. 安装mongodb

可以选择download 后上传服务器，或cope link

1. 使用wget下载tgz包，我当前目录/usr/local/

   ```sh
   wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.4.4.tgz
   ```

2. 解压

   ```sh
   tar -zxvf mongodb-linux-x86_64-rhel70-4.4.4.tgz
   ```

3. 移动到mongodb目录

   ```sh
   mv mongodb-linux-x86_64-rhel70-4.4.4/ mongodb
   ```

## 3. 配置

1. 在mongoDB根目录下创建data目录及其子目录db，以及日志目录logs以及其日志文件mongoLogs.log，和配置文件mongodb.conf，命令如下

   ```sh
   mkdir /home/mongodb/db
   mkdir /home/mongodb/logs/
   ```

2. 编辑配置文件mongodb.conf，命令如下

   ```sh
    
   # 数据库文件位置
   dbpath=/home/mongodb/db
    
   #日志文件位置
   logpath=/home/mongodb/logs/mongo.log
    
   # 是否追加方式写入日志，默认True
   logappend=true
    
   # 设置绑定ip
   bind_ip = 0.0.0.0
   
   # 设置端口
   port = 27017
     
   #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
   quiet=false
    
   # 启用日志文件，默认启用
   journal=true
   
   
   ```

3. 配置启动脚本：startup.sh

   ```sh
   bin/mongod --config "./mongodb.conf" &
   ```

4. 配置停止脚本：shutdown.sh

   ```sh
   mongod --shutdown  --dbpath /home/db/
   ```

## 4. 启动

1. 启动命令

   ```
   sh startup.sh
   ```

2. 停止命令

   ```
   sh shutdown.sh
   ```

3. mongo连接测试

   ```
   ./mongo
   ```

   ![image-20210406233633436](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406233633436.png)

## 5. 配置账户，授权登录

mongodb我们已经安装完成，也成功启动连接上了测试库，但此时我们./mongo启动的时候是默认不需要授权登录的，这样并不安全，所以我们需要创建管理员，之后启动及操作都需要授权登录才可以进行。

1. 创建admin数据库，创建用户，设置账号，密码，权限

   ```sh
   > use admin
   switched to db admin
   > db.createUser({user:"root",pwd:"123456",roles:["root"]})
   Successfully added user: { "user" : "root", "roles" : [ "root" ] }
   ```

2. 使用账号密码登录后，结束mongodb程序

   ```sh
   > use admin
   switched to db admin
   > db.auth('root','123456');
   1
   > db.shutdownServer();
   Error: shutdownServer failed: {
           "ok" : 0,
           "errmsg" : "shutdown must run from localhost when running db without auth",
           "code" : 13,
           "codeName" : "Unauthorized"
   } :
   _getErrorWithCode@src/mongo/shell/utils.js:25:13
   DB.prototype.shutdownServer@src/mongo/shell/db.js:426:19
   @(shell):1:1
   
   ```

3. 修改配置文件，重启使配置生效

   ```
   # 末尾添加上
   #开启身份验证
   auth = true
   ```

4. 重启

   ```sh
   ./mongod --config /usr/local/mongoDB/mongodb.conf
   ```

5. 以管理员账号登录，创建普通用户，之后本地做开发连接数据库时需要配置账号密码才可以成功连接

   ```ssh
   1，以管理员账号连接数据库
   [root@izbp1b498epn4trb75oykez bin]# ./mongo 127.0.0.1:27017/admin --username "root" --password "123456"
   2，创建数据库,创建账号，给读写权限
   > use blog
   > db.createUser({user:"blogAdmin",pwd:"123456",roles:[{role:"readWrite",db:"blog"}]})
   Successfully added user: {
   	"user" : "blogAdmin",
   	"roles" : [
       	{
   	    	"role" : "readWrite",
   	    	"db" : "blog"
       	}
   	]
   }
   
   ```

   


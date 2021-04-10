# 手写SQL面试题

## 1. 背景

常见的语法sql面得不多，更多的会在分组和统计相关的面得比较多

- GROUP BY
  - 如果用group by ，那么你的select语句中选出的列要么是你group by里用到的列，要么就是带有之前我们说的sum，min 等函数的列
- HAVING
  - 通常与group by 子句一起使用
  - where 过滤行，having 过滤组
  - 出现在同一sql顺序：where > group by>having
- 统计相关: COUNT,SUM,MAX,MIN,AVG

## 2. SQL 准备

1. 表关系

![image-20210406211823871](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406211823871.png)

2. 学生表 student

   ```sql
   CREATE TABLE student (
   student_id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(32) DEFAULT NULL,
   age int(11) DEFAULT NULL,
   sex varchar(8) DEFAULT NULL,
   PRIMARY KEY (student_id)
   ) ENGINE=INNODB AUTO_INCREMENT=8 DEFAULT CHARSET =UTF8;
   
   
   INSERT INTO student VALUES (1,'李雷',19,'女');
   INSERT INTO student VALUES (2,'韩梅梅',18,'男');
   INSERT INTO student VALUES (3,'polly',17,'女');
   INSERT INTO student VALUES (4,'tom',18,'男');
   INSERT INTO student VALUES (5,'大卫',17,'男');
   INSERT INTO student VALUES (6,'露丝',19,'女');
   INSERT INTO student VALUES (7,'杰克',25,'男');
   ```

3. 分数表score

   ```sql
   CREATE TABLE score (
   student_id int(11) DEFAULT NULL,
   course_id int(11) DEFAULT NULL,
   score int(11) DEFAULT NULL
   ) ENGINE=INNODB DEFAULT CHARSET =UTF8;
   
   
   BEGIN;
   INSERT INTO `score` VALUES (1, 2, 78);
   INSERT INTO `score` VALUES (1, 3, 67);
   INSERT INTO `score` VALUES (1, 4, 67);
   INSERT INTO `score` VALUES (2, 1, 52);
   INSERT INTO `score` VALUES (2, 2, 81);
   INSERT INTO `score` VALUES (2, 3, 92);
   INSERT INTO `score` VALUES (2, 4, 67);
   INSERT INTO `score` VALUES (3, 1, 52);
   INSERT INTO `score` VALUES (3, 2, 47);
   INSERT INTO `score` VALUES (3, 3, 88);
   INSERT INTO `score` VALUES (3, 4, 67);
   INSERT INTO `score` VALUES (4, 2, 88);
   INSERT INTO `score` VALUES (4, 3, 90);
   INSERT INTO `score` VALUES (4, 4, 67);
   INSERT INTO `score` VALUES (5, 1, 52);
   INSERT INTO `score` VALUES (5, 3, 78);
   INSERT INTO `score` VALUES (5, 4, 67);
   INSERT INTO `score` VALUES (6, 1, 52);
   INSERT INTO `score` VALUES (6, 2, 68);
   INSERT INTO `score` VALUES (6, 4, 67);
   INSERT INTO `score` VALUES (1, 1, 52);
   INSERT INTO `score` VALUES (5, 2, 72);
   INSERT INTO `score` VALUES (7, 2, 72);
   COMMIT;
   ```

4. 课程表

   ```sql
   CREATE TABLE course (
   course_id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(32) DEFAULT NULL,
   PRIMARY KEY (course_id)
   )ENGINE=INNODB DEFAULT CHARSET =UTF8;
   
   
   INSERT INTO course VALUES (1,'语文');
   INSERT INTO course VALUES (2,'数学');
   INSERT INTO course VALUES (3,'英语');
   INSERT INTO course VALUES (4,'物理');
   ```

## 3. GROUP BY 练习

1. 查询所有同学的学号，选课数，总成绩

   ```sql
   SELECT student_id ,COUNT(course_id),SUM(score)
   FROM score
   GROUP BY student_id
   ```

   ![image-20210406215817378](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406215817378.png)

2. 查询所有同学的学号，姓名，选课数，总成绩

   分数和学生信息在不同的表中，需要联合表

   ```sql
   SELECT s.student_id ,stu.name,COUNT(s.course_id),SUM(s.score)
   FROM score s,
   student stu
   WHERE s.student_id = stu.student_id
   GROUP BY s.student_id
   ```

   ![image-20210406220759681](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406220759681.png)

## 4. HAVING 练习

1. 查询没有血泉所有课的同学的学号、姓名

   ```sql
   SELECT stu.student_id,stu.name
   FROM 
   student stu,
   score s
   WHERE stu.student_id = s.student_id
   GROUP BY s.student_id
   HAVING COUNT(*) < (
   SELECT COUNT(*) FROM course)
   ```

   ![image-20210406221302898](https://gitee.com/zszdevelop/blogimage/raw/master/image-20210406221302898.png)
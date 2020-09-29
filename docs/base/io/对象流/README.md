# 对象流

用于存储和读取对象的处理流

- 可以吧Java中的对象写入到数据源汇总
- 也能吧对象从数据源中还原

##序列化与反序列化：

- 序列化（Serialize）：用objectOutputStream 类将一个Java对象写入IO流汇总
- 反序列化（Deserialize）:用ObjectInputStream类从IO流中恢复Java对象

不能序列化static和transient修饰的成员变量

### 某些字段不想序列话

使用transient 关键字修饰

transient关键字的作用：阻止实例中那些用此关键字修饰的变量序列化；当对象被反序列化时，被transient修饰的变量值不会被持久化和恢复。transient只能修饰变量，不能修饰类和方法
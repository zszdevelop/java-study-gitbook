# 数据库字典表设计与前端Element-select配合使用

## 1. 字典表设计

### 1.1 不用字典表，有什么问题

- 某些变量在多个地方使用，而且一般是固定的，但是随着系统升级和后期变化，可能需要改变，如果这些变量写死在代码里面将会变得难以维护，所以要将其从代码中抽离出来。

- 一般的业务系统客户端与用户交互的时候都会使用`下拉框`组件，对于某些比较固定的值的下拉组件的数据来源一般都是比较固定的一类数值。

### 1.2 如何解决

- 方案一：写死在代码

  有的做法是使用枚举或者Constants常量类来实现，这种情况下在量少的前提是没问题的，而且一旦需要修改就及其避免修改源码；随着系统的开发拓展，后期将无法维护，甚至命名困难等问题。

- 方案二：放数据库

  通常把字典放在数据库，这样后期的维护变更就比较简单,也可以在不用修改代码的情况下修改配置。还有，对于某些固定的数据字典（例如，星期，月份等）不允许修改。

- 方案三（推荐）：放数据库并配置缓存

  放在数据库又有着频繁访问数据库的问题，这不是我们希望的，这时候通常做法就是加缓存，降低访问数据库的频率。

### 1.3 字典表的设计：

通常分成两张表来实现，一个是`字典类型`，一个是`字典`

-  典类型表SYS_DICT_TYPE 

  | 名称     | 标识符    | 表示格式      | 值域/备注        |
  | -------- | --------- | ------------- | ---------------- |
  | 字典主键 | DICT_ID   | NUMBER(20)    |                  |
  | 字典名称 | DICT_NAME | VARCHAR2(100) |                  |
  | 字典类型 | DICT_TYPE | VARCHAR2(100) |                  |
  | 状态     | STATUS    | CHAR(1)       | 0：正常，1：停用 |
  | 备注     | REMARK    | VARCHAR2(500) |                  |

- 字典数据表SYS_DICT_DATA

  | 名称     | 标识符     | 表示格式      | 值域/备注        |
  | -------- | ---------- | ------------- | ---------------- |
  | 字典主键 | DICT_CODE  | NUMBER(20)    |                  |
  | 字典排序 | DICT_SORT  | NUMBER(4)     |                  |
  | 字典标签 | DICT_LABEL | VARCHAR2(100) |                  |
  | 字典键值 | DICT_VALUE | VARCHAR2(100) |                  |
  | 字典类型 | DICT_TYPE  | VARCHAR2(100) |                  |
  | 是否默认 | IS_DEFAULT | CHAR(1)       | Y：是，N：否     |
  | 状态     | STATUS     | CHAR(1)       | 0：正常，1：停用 |
  | 备注     | REMARK     | VARCHAR2(500) |                  |




## 2. 字典缓存逻辑

1.  项目启动时，初始化字典到缓存 @PostConstruct

   ```java
   /**
        * 项目启动时，初始化字典到缓存
        */
       @PostConstruct
       public void init()
       {
           List<SysDictType> dictTypeList = dictTypeMapper.selectDictTypeAll();
           for (SysDictType dictType : dictTypeList)
           {
               List<SysDictData> dictDatas = dictDataMapper.selectDictDataByType(dictType.getDictType());
               DictUtils.setDictCache(dictType.getDictType(), dictDatas);
           }
       }
   ```

2. 缓存字典list

   ```java
    /**
        * 设置字典缓存
        * 
        * @param key 参数键
        * @param dictDatas 字典数据列表
        */
       public static void setDictCache(String key, List<SysDictData> dictDatas)
       {
           SpringUtils.getBean(RedisCache.class).setCacheObject(getCacheKey(key), dictDatas);
       }
   ```

   缓存key

   ```java
    public static String getCacheKey(String configKey)
       {
           return Constants.SYS_DICT_KEY + configKey;
       }
   ```

3. 获取字典缓存

   ```java
     /**
        * 获取字典缓存
        * 
        * @param key 参数键
        * @return dictDatas 字典数据列表
        */
       public static List<SysDictData> getDictCache(String key)
       {
           Object cacheObj = SpringUtils.getBean(RedisCache.class).getCacheObject(getCacheKey(key));
           if (StringUtils.isNotNull(cacheObj))
           {
               List<SysDictData> dictDatas = StringUtils.cast(cacheObj);
               return dictDatas;
           }
           return null;
       }
   ```

4. 根据字典类型和字典值获取字典标签

   因为缓存的是list，所以id获取lable的时候还需要转

   ```java
   /**
        * 根据字典类型和字典值获取字典标签
        * 
        * @param dictType 字典类型
        * @param dictValue 字典值
        * @return 字典标签
        */
       public static String getDictLabel(String dictType, String dictValue)
       {
           return getDictLabel(dictType, dictValue, SEPARATOR);
       }
   ```

   ```java
      /**
        * 根据字典类型和字典值获取字典标签
        * 
        * @param dictType 字典类型
        * @param dictValue 字典值
        * @param separator 分隔符
        * @return 字典标签
        */
       public static String getDictLabel(String dictType, String dictValue, String separator)
       {
           StringBuilder propertyString = new StringBuilder();
           List<SysDictData> datas = getDictCache(dictType);
   
           if (StringUtils.containsAny(separator, dictValue) && StringUtils.isNotEmpty(datas))
           {
               for (SysDictData dict : datas)
               {
                   for (String value : dictValue.split(separator))
                   {
                       if (value.equals(dict.getDictValue()))
                       {
                           propertyString.append(dict.getDictLabel() + separator);
                           break;
                       }
                   }
               }
           }
           else
           {
               for (SysDictData dict : datas)
               {
                   if (dictValue.equals(dict.getDictValue()))
                   {
                       return dict.getDictLabel();
                   }
               }
           }
           return StringUtils.stripEnd(propertyString.toString(), separator);
       }
   
   ```

5. 根据字典类型和字典标签获取字典值

   ```java
    /**
        * 根据字典类型和字典标签获取字典值
        * 
        * @param dictType 字典类型
        * @param dictLabel 字典标签
        * @return 字典值
        */
       public static String getDictValue(String dictType, String dictLabel)
       {
           return getDictValue(dictType, dictLabel, SEPARATOR);
       }
   ```

   ```java
   /**
        * 根据字典类型和字典标签获取字典值
        * 
        * @param dictType 字典类型
        * @param dictLabel 字典标签
        * @param separator 分隔符
        * @return 字典值
        */
       public static String getDictValue(String dictType, String dictLabel, String separator)
       {
           StringBuilder propertyString = new StringBuilder();
           List<SysDictData> datas = getDictCache(dictType);
   
           if (StringUtils.containsAny(separator, dictLabel) && StringUtils.isNotEmpty(datas))
           {
               for (SysDictData dict : datas)
               {
                   for (String label : dictLabel.split(separator))
                   {
                       if (label.equals(dict.getDictLabel()))
                       {
                           propertyString.append(dict.getDictValue() + separator);
                           break;
                       }
                   }
               }
           }
           else
           {
               for (SysDictData dict : datas)
               {
                   if (dictLabel.equals(dict.getDictLabel()))
                   {
                       return dict.getDictValue();
                   }
               }
           }
           return StringUtils.stripEnd(propertyString.toString(), separator);
       }
   ```

   

## 3. 前端Element el-select配合使用

1. 在页面create 中，获取字典表码值数据

   ```js
   created() {
       this.getDicts("sys_status").then(response => {
         this.statusOptions = response.data;
       });
   }
   ```

2. 下拉框使用

   ```
    <el-form-item label="任务状态" prop="status">
           <el-select v-model="queryParams.status" placeholder="请选择任务状态" clearable size="small">
             <el-option
               v-for="dict in statusOptions"
               :key="dict.dictValue"
               :label="dict.dictLabel"
               :value="dict.dictValue"
             />
           </el-select>
         </el-form-item>
   ```

3. 如果列表字段需要翻译

   1. 在table中需要翻译成中文名

      ```vue
       <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      ```

      ```js
      // 登录状态字典翻译
          statusFormat(row, column) {
            return this.selectDictLabel(this.statusOptions, row.status);
          },
      ```

      全局的方法

      ```js
      // 回显数据字典
      export function selectDictLabel(datas, value) {
      	var actions = [];
      	Object.keys(datas).some((key) => {
      		if (datas[key].dictValue == ('' + value)) {
      			actions.push(datas[key].dictLabel);
      			return true;
      		}
      	})
      	return actions.join('');
      }
      
      // 回显数据字典（字符串数组）
      export function selectDictLabels(datas, value, separator) {
      	var actions = [];
      	var currentSeparator = undefined === separator ? "," : separator;
      	var temp = value.split(currentSeparator);
      	Object.keys(value.split(currentSeparator)).some((val) => {
      		Object.keys(datas).some((key) => {
      			if (datas[key].dictValue == ('' + temp[val])) {
      				actions.push(datas[key].dictLabel + currentSeparator);
      			}
      		})
      	})
      	return actions.join('').substring(0, actions.join('').length - 1);
      }
      ```

      

   ## 参考文章

   [字典表设计](https://www.jianshu.com/p/0034802afc1f)


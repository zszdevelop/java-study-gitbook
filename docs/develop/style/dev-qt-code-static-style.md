---
order: 30
category:
  - code style

---

# 代码质量 - 统一风格：静态样式检查详解

> 统一样式检查规范里，最为常用的统一样式工具是checkstyle插件，本文将介绍常用的统一风格的措施之**静态样式检查**。

## 1. 统一样式检查

> 在标准化的统一样式检查规范里，最为常用的统一样式工具是checkstyle插件，而不是国内阿里的代码规约插件。

- **下载插件**

![image-20220902214146448](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220902214146448.png)

- **配置生效**

配置生效及告警设置

![image-20220902214211530](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220902214211530.png)

- **配置checkstyle.xml**

  - 官网地址 https://checkstyle.sourceforge.io/

  - 官网最新Releases https://github.com/checkstyle/checkstyle/releases/

  - 下面不是最新的版本，但是提供了中文的解释，可以参考下；实际使用时或者兼容问题请到官网下载最新的规则；

```xml
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
    "-//Puppy Crawl//DTD Check Configuration 1.3//EN"
    "http://www.puppycrawl.com/dtds/configuration_1_3.dtd">
    
<module name="Checker">

    <module name="TreeWalker">
    
    
        <!-- =============注释检查============= -->
        <!-- 检查类和接口的javadoc 默认不检查author 和version tags         
            authorFormat: 检查author标签的格式  
            versionFormat: 检查version标签的格式  
            scope: 可以检查的类的范围，例如：public只能检查public修饰的类，private可以检查所有的类  
            excludeScope: 不能检查的类的范围，例如：public，public的类将不被检查，但访问权限小于public的类仍然会检查，其他的权限以此类推  
            tokens: 该属性适用的类型，例如：CLASS_DEF,INTERFACE_DEF -->  
        <module name="JavadocType">  
            <property name="authorFormat" value="\S"/>  
            <property name="scope" value="protected"/>  
            <property name="versionFormat" value="\$Revision.*\$"/>  
            <property name="excludeScope" value="public"/>  
            <property name="tokens" value="CLASS_DEF,INTERFACE_DEF"/>  
        </module>  
    
        <!-- 检查方法的javadoc的注释  
            scope: 可以检查的方法的范围，例如：public只能检查public修饰的方法，private可以检查所有的方法  
            allowMissingParamTags: 是否忽略对参数注释的检查  
            allowMissingThrowsTags: 是否忽略对throws注释的检查  
            allowMissingReturnTag: 是否忽略对return注释的检查 -->  
        <module name="JavadocMethod">    
            <property name="scope" value="private"/>    
            <property name="allowMissingParamTags" value="false"/>    
            <property name="allowMissingThrowsTags" value="false"/>    
            <property name="allowMissingReturnTag" value="false"/>    
            <property name="tokens" value="METHOD_DEF"/>    
            <property name="allowUndeclaredRTE" value="true"/>    
            <property name="allowThrowsTagsForSubclasses" value="true"/>    
            <!--允许get set 方法没有注释-->  
            <property name="allowMissingPropertyJavadoc" value="true"/>  
        </module>   
        
        <!-- 检查变量是否具有Javadoc注释
            scope: 检查变量的范围，例如：public只能检查public修饰的变量，private可以检查所有的变量 -->  
        <module name="JavadocVariable">  
            <property name="scope" value="private"/>  
        </module>

        
        <!-- =============命名检查============= -->
        <!-- 检查抽象类的名称是否遵守命名规约
            format: 定义抽象类的命名规则 -->  
        <module name="AbstractClassName">　　　　　　　
　　        <property name="format" value="^Abstract.*$|^.*Factory$"/> 
        </module>

        <!-- 检查常量（用static final修饰的字段）的名称是否遵守命名规约
            format: 定义全局常量的命名规则 -->  
        <module name="ConstantName">  
            <property name="format" value="^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$"/>  
        </module>  
        
        <!-- 检查局部final变量的名称是否遵守命名规约
            format: 定义局部常量的命名规则 -->  
        <module name="LocalFinalVariableName">  
            <property name="format" value="^[A_Z][A-Z0-9]*(_[A_Z0-9]+)*$"/>  
        </module>  
        
        <!-- 检查局部变量的名称是否遵守命名规约
            format: 定义局部常量的命名规则 -->  
        <module name="LocalVariableName">  
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>  
        </module>  
        
        <!-- 检查成员变量（非静态字段）的名称是否遵守命名规约
            format: 定义非静态成员变量的命名规则
　　　　    applyToPublic: 是否适用于public的成员变量
　　　　    applyToProtected: 是否适用于protected的成员变量
　　　　    applyToPackage: 是否适用于package的成员变量
　　　　    applyToPrivate: 是否适用于private的成员变量 -->  
        <module name="MemberName">  
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>  
            <property name="applyToPublic" value="true"/>  
            <property name="applyToProtected" value="true"/>  
            <property name="applyToPackage" value="true"/>  
            <property name="applyToPrivate" value="true"/>  
        </module>
        
        <!--　检查方法名称是否遵守命名规约
            format: 定义方法名的命名规则 --> 
        <module name="MethodName">  
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>  
        </module>
        
        <!--　检查包名称是否遵守命名规约
            format: 定义包名的命名规则 --> 
        <module name="PackageName">  
            <property name="format" value="^[a-z]+(\.[a-z][a-z0-9]*)*$"/>  
        </module>  
        
        <!--　检查参数名称是否遵守命名规约
            format: 定义参数名的命名规则 --> 
        <module name="ParameterName">  
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>  
        </module>
        
        <!--　检查静态变量（用static修饰，但没用final修饰的字段）的名称是否遵守命名规约
            format: 定义静态变量的命名规则 --> 
        <module name="StaticVariableName">  
            <property name="format" value="^[a-z][a-zA-Z0-9]*$"/>  
        </module>  
        
        <!--　检查类的名称是否遵守命名规约
            format: 定义类和接口的命名规则
　　　　    tokens: 定义规则适用的类型，例如：CLASS_DEF表示类，INTERFACE_DEF 表示接口 --> 
        <module name="TypeName">  
            <property name="format" value="^[A-Z][a-zA-Z0-9]*$"/>  
            <property name="tokens" value="CLASS_DEF,INTERFACE_DEF"/>  
        </module>
        
        
        <!-- =============import检查=============-->
        <!--　检查没有import语句使用*符号
            excludes: 定义可以使用*导入的包 --> 
        <module name="AvoidStarImport">  
            <property name="excludes" value="java.io,java.util"/>  
        </module>
        
        <!--　检查是否导入了指定的非法包 --> 
        <module name="IllegalImport"/>  
        
        <!--　检查导入包的顺序/分组
            groups: 定义导入包的顺序，默认以字母顺序导入
　　　　    ordered: 定义包是否必须按规定的顺序显示
　　　　    separated: 定义包与包之间是否应添加空白行
　　　　    caseSensitive: 是否区分包名的大小写　--> 
        <module name="ImportOrder">  
            <property name="groups" value="java,javax"/>  
            <property name="ordered" value="true"/>  
            <property name="separated" value="true"/>  
            <property name="caseSensitive" value="true"/>  
        </module>
        
        <!--　检查是否存在多余的导入语句 --> 
        <module name="RedundantImport"/>
        
        <!--　检查未使用的导入语句 -->
        <module name="UnusedImports"/> 
        
        
        <!-- =============长度检查============= -->
        <!--　检查匿名内部类的长度
            max: 定义匿名内部类最多容许的行数 --> 
        <module name="AnonInnerLength">  
            <property name="max" value="20"/>  
        </module>  
        
        <!--　检查要执行的语句的数目，将可执行语句的数量限制为一个指定的限值
            max: 定义所能容许的语句的最多数目
　　　　    tokens: 定义可以检查的类型，例如：CTOR_DEF,METHOD_DEF,STATIC_INIT,INSTANCE_INIT --> 
        <module name="ExecutableStatementCount">  
            <property name="max" value="20"/>  
            <property name="tokens" value="CTOR_DEF,METHOD_DEF,STATIC_INIT,INSTANCE_INIT"/>  
        </module> 
        
        <!--　检查源码文件的长度
            max: 定义一个文件所能容许的行数 --> 
        <module name="FileLength">  
            <property name="max" value="1000"/>  
        </module>
        
        <!--　检查源码每行的长度 --> 
        <module name="LineLength">  
            <property name="max" value="80"/>  
            <property name="ignorePattern" value="^ *\* *[^ ]+$"/>  
        </module> 
        
        <!--　检查方法和构造器的长度
            max: 最多容许的行数
　　　　    countEmpty: 是否计算空行
　　　　    tokens: 定义检查的类型 --> 
        <module name="MethodLength">  
            <property name="max" value="100"/>  
            <property name="countEmpty" value="true"/>  
            <property name="tokens" value="METHOD_DEF"/>  
        </module> 
        
        <!--　检查一个方法或构造器的参数的数量
            max: 定义最多有多少个参数
　　　　    tokens: 定义检查的类型　 --> 
        <module name="ParameterNumber">  
            <property name="max" value="10"/>  
            <property name="tokens" value="METHOD_DEF,CTOR_DEF"/>  
        </module>
        
        
        <!-- =============空格检查============= -->
        <!--　检查空的for循环初始化语句的填充符
            option: 定义初始化语句中是否使用空格，例如：space表示使用空格，则for(int i = 0; i < 100; i++)
            就是符合格式要求的，而for(int i=0; i<100;i++)就不符合要求　 --> 
        <module name="EmptyForInitializerPad">  
            <property name="option" value="space"/>  
        </module>
        
        <!--　检查for iterator语句是否使用空格
            option:定义初始化语句是否使用空格，例如：space表示使用空格，则for(Iterator iterator = List.iterator();iterator.hasNext(); iterator.next())就是形式合理的，否则就是形式不合理的 --> 
        <module name="EmptyForIteratorPad">  
            <property name="option" value="space"/>  
        </module> 
        
        <!--　检查指定标记之后没有空格。若要禁用指定标记之后的换行符，将allowLineBreaks属性设为false即可。 --> 
        <module name="NoWhitespaceAfter"/>
        
        <!--　检查指定标记之前没有空格。若要允许指定标记之前的换行符，将allowLineBreaks属性设为true即可 --> 
        <module name="NoWhitespaceBefore"/>
        
        <!--　检查代码自动换行时，运算符所处位置的策略
            option: 定义运算符的位置，eol在同一行，nl在下一行
　　　　    tokens: 定义检查的类型 --> 
        <module name="OperatorWrap">  
            <property name="tokens"   
                value="ASSIGN, DIV, DIV_ASSIGN, PLUS_ASSIGN, MINUS, MINUS_ASSIGN, STAR, STAR_ASSIGN, MOD, MOD_ASSIGN, SR, SR_ASSIGN, BSR, BSR_ASSIGN, SL, SL_ASSIGN, BXOR, BXOR_ASSIGN, BOR, BOR_ASSIGN, BAND, BAND_ASSIGN,PLUS, QUESTION"/>  
            <property name="option" value="eol"/>  
        </module> 
        
        <!--　检查方法定义、构造器定义、方法调用、构造器调用的标识符和参数列表的左圆括号之间的填充符
            allowLineBreaks: 参数是否允许在不同行
　　　　    option: 在参数和括号、参数和标识符之间是否包含空格
　　　　    tokens: 检查的类型 --> 
        <module name="MethodParamPad">  
            <property name="allowLineBreaks" value="false"/>  
            <property name="option" value="space"/>  
            <property name="tokens" value="METHOD_DEF,CTOR_DEF"/>  
        </module>
        
        <!--　检查圆括号的填充符策略，也就是在左圆括号之后和右圆括号之前是否需要有一个空格
            option: space表示有空格，nospace表示没有空格
　　　　    tokens: 定义检查的类型 --> 
        <module name="ParenPad">  
            <property name="option" value="nospace"/>  
        </module>
        
        <!--　检查类型转换的圆括号的填充符策略。也就是，在左圆括号之后和右圆括号之前是否需要有一个空格
            option: space表示有空格，nospace表示没有空格
　　　　    tokens: 定义检查的类型 --> 
        <module name="TypecastParenPad">  
            <property name="option" value="space"/>  
        </module> 
        
        <!--　检查源码中没有制表符（'\t'） --> 
        <module name="TabCharacter"/>

        <!--　检查指定标记之后是否紧跟了空格
        　    tokens: 检查的类型 --> 
        <module name="WhitespaceAfter">  
            <property name="tokens" value="COMMA,SEMI,TYPECAST"/>  
        </module>  
        
        <!--　检查指定标记的周围是否有空格
            可以选择性地从检查策略中排除，通过设置allowEmptyMethods和allowEmptyConstructors属性即可
        　    tokens: 检查的类型 --> 
        <module name="WhitespaceAround">  
            <property name="tokens" value="ASSIGN"/>  
        </module> 
        
        
        <!-- =============修饰符检查============= -->
        <!--　检查代码中的标识符的顺序是否符合《Java Language Specification》中的第8.1.1、8.3.1章节所建议的顺序
            正确的顺序应当如下：
　　　　    1. public
　　　　    2. protected
　　　　    3. private
　　　　    4. abstract
　　　　    5. static
　　　　    6. final
　　　　    7. transient
　　　　    8. volatile
　　　　    9. synchronized
　　　　    10. native
　　　　    11. strictfp --> 
        <module name="ModifierOrder"/> 
        
        <!--　在以下部分检查是否有多余的修饰符：
　　　　    1. 接口和注解的定义；
　　　　    2. final类的方法的final修饰符；
　　　　    3. 被声明为static的内部接口声明
　            tokens: 检查的类型 -->
        <module name="RedundantModifier">  
            <property name="tokens" value="METHOD_DEF,VARIABLE_DEF"/>  
        </module>
        
        
        <!-- =============代码块检查============= -->
        <!--　找到嵌套代码块，也就是在代码中无节制使用的代码块
            allowInSwitchCase: 定义是否允许switch case中使用嵌套的代码块 --> 
        <module name="AvoidNestedBlocks">  
            <property name="allowInSwitchCase" value="true"/>  
        </module>
        
        <!--　检查空代码块
            option: 定义代码块中应该包含的内容，例如：stmt表示语句
　　　　    tokens: 检查的类型 -->
        <module name="EmptyBlock">  
            <property name="option" value="stmt"/>  
        </module>
        
        <!--　检查代码块的左花括号的放置位置
            option: 定义左大括号'{'显示位置，eol在同一行显示，nl在下一行显示
　　　　    maxLineLength: 大括号'{'所在行行最多容纳的字符数
　　　　    tokens: 该属性适用的类型，例：CLASS_DEF,INTERFACE_DEF,METHOD_DEF,CTOR_DEF -->
        <module name="LeftCurly">  
            <property name="option" value="eol"/>  
            <property name="maxLineLength" value="80"/>  
            <property name="tokens" value="CLASS_DEF,INTERFACE_DEF,METHOD_DEF,CTOR_DEF"/>  
        </module>
        
        <!--　检查代码块周围是否有大括号，可以检查do、else、if、for、while等关键字所控制的代码块
            tokens: 定义检查的类型 -->
        <module name="NeedBraces"/>

        <!--　检查else、try、catch标记的代码块的右花括号的放置位置
            tokens: 定义检查的类型 -->
        <module name="RightCurly">  
            <property name="option" value="alone"/>  
            <property name="tokens" value="LITERAL_TRY"/>  
        </module> 
        
        
        <!-- =============编码检查============= -->
        <!--　检查是否在同一行初始化， 例如：private int Age = nGe==1 ? 100 : 0; 就应该避免 --> 
        <module name="AvoidInlineConditionals"/>
        
        <!--　检查定义了共变equals()方法的类中是否同样覆盖了equals(java.lang.Object)方法 -->
        <module name="CovariantEquals"/> 
        
        <!--　检查switch语句中的default是否在所有的case分支之后 -->
        <module name="DefaultComesLast"/>
        
        <!-- 检查空的代码段 -->
        <module name="EmptyStatement"/>
        
        <!--　检查覆盖了equals()方法的类是否也覆盖了hashCode()方法 -->
        <module name="EqualsHashCode"/>
        
        <!--　检查类或对象的成员是否显式地初始化为成员所属类型的默认值
        （对象引用的默认值为null，数值和字符类型的默认值为0，布尔类型的默认值为false） -->
        <module name="ExplicitInitialization"/>
        
        <!--　检查switch语句中是否存在跨越分支。
        如果一个case分支的代码中缺少break、return、throw或continue语句，那么就会导致跨越分支 -->
        <module name="FallThrough"/>
        
        <!--　检查变量值没有改动的情况下，该变量是否定义成了final -->
        <module name="FinalLocalVariable"/> 
        
        <!--　检查局部变量或参数是否会遮蔽在相同类中定义的字段 -->
         <module name="HiddenField"/>
         
        <!--　检查是否有不合法的实例化操作，是否使用工厂方法更好 -->
        <module name="IllegalInstantiation"/>
        
        <!--　非法异常捕捉,不允许捕捉java.lang.Exception、java.lang.Error、java.lang.RuntimeException的行为 -->
        <module name="IllegalCatch"/>
        
        <!-- 检查子表达式中是否有赋值操作 -->
        <module name="InnerAssignment"/>
        
        <!-- 检查是否有"魔术"数字 -->
        <module name="MagicNumber">
           <property name="ignoreNumbers" value="0, 1"/>
           <property name="ignoreAnnotation" value="true"/>
        </module>
        
        <!--　检查switch语句是否含有default子句 -->
        <module name="MissingSwitchDefault"/>
        
        <!--　检查循环控制变量是否被修改 -->
        <module name="ModifiedControlVariable"/>
        
        <!--　检查一个字符串变量在不改变变量值的情况下或者字符串出现的次数
            allowedDuplicates: 定义在类中一个字符串变量在不改变变量值的情况下或者字符串所能使用的最多次数 -->
        <module name="MultipleStringLiterals">  
            <property name="allowedDuplicates" value="3"/>  
        </module>
        
        <!--　检查一次声明多个变量时，变量是否在同一行或者在同一个语句中 -->
        <module name="MultipleVariableDeclarations"/>
        
        <!--　限制if-else代码块的嵌套层数（默认值为1）-->
        <module name="NestedIfDepth">  
            <property name="max" value="1"/>  
        </module>
        
        <!--　限制try代码块的嵌套层数（默认值为1）-->
        <module name="NestedTryDepth">  
            <property name="max" value="3"/>  
        </module>
        
        <!-- 确保一个类具有一个包声明，并且（可选地）包名要与源代码文件所在的目录名相匹配 -->
        <module name="PackageDeclaration"/>
        
        <!-- 不允许对参数进行赋值 -->
        <module name="ParameterAssignment"/>
        
        <!-- 检查throws子句中是否声明了多余的异常 -->
        <module name="RedundantThrows">  
            <property name="allowUnchecked" value="true"/>  
            <property name="allowSubclasses" value="true"/>  
        </module>
        
        <!-- 检查是否使用了this -->
        <module name="RequireThis">  
            <property name="checkFields" value="false"/>  
            <property name="checkMethods" value="false"/>  
        </module>
        
        <!-- 禁止使用System.out.println -->
        <module name="Regexp">
            <property name="format" value="System\.out\.println"/>
            <property name="illegalPattern" value="true"/>
        </module>
        
        <!-- 限制return语句的数量。默认值为2。可以忽略检查指定的方法（默认忽略equals()方法 -->
        <module name="ReturnCount">  
            <property name="max" value="3"/>  
        </module>
        
        <!-- 检查是否有过于复杂的布尔表达式。现在能够发现诸如if (b == true)、b || true、!false等类型的代码 -->
        <module name="SimplifyBooleanExpression"/>
        
        <!-- 检查是否有过于复杂的布尔类型return语句 -->
        <module name="SimplifyBooleanReturn"/> 
        
        <!-- 检查在判断字符串是否相等时是否使用了正确的形式 -->
        <module name="StringLiteralEquality"/>
        
        <!-- 检查一个覆盖的clone()方法是否调用了super.clone()方法 -->
        <module name="SuperClone"/> 
        
        <!-- 检查一个覆盖的finalize()方法是否调用了super.finalize()方法 -->
        <module name="SuperFinalize"/>
        
        <!-- 检查初始化数祖时，最后一个元素后面是否加了逗号，如果左右大括号都在同一行，则可以不加逗号 -->
        <module name="ArrayTrailingComma"/>
        
        <!-- 检查代码中是否使用了不必要的圆括号 -->
        <module name="UnnecessaryParentheses"/>
        
        
        <!-- =============类设计检查============= -->
        <!-- 检查类是否被设计为可扩展的，如果是，则方法应该abstract、final或者是空的 -->
        <module name="DesignForExtension"/>
        
        <!-- 检查一个只有私有构造器的类是否被声明为final -->
        <module name="FinalClass"/>
        
        <!-- 确保工具类（在API中只有静态方法和字段的类）没有任何公有构造器 -->
        <module name="HideUtilityClassConstructor"/>
        
        <!--　检查接口是否只定义了变量而没有定义方法，因为接口应该用来描述一个类型，所以只定义变量而不定义方法是不恰当的
            allowMarkerInterfaces: 是否检查空接口 -->
        <module name="InterfaceIsType">  
            <property name="allowMarkerInterfaces" value="true"/>  
        </module>
        
        <!--　将异常抛出语句的数量配置为一个指定的限值（默认值为1）-->
         <module name="ThrowsCount">  
            <property name="max" value="7"/>  
        </module>
        
        <!--　检查类成员的可见性。
            只有static final的类成员可以是公有的，其他的类成员必须是私有的，除非设置了protectedAllowed属性或packageAllowed属性
            packageAllowed: 变量包内成员可以访问
            protectedAllowed: 变量是受保护的
            publicMemberPattern: 可以公开访问的变量所匹配的命名形式 -->
        <module name="VisibilityModifier">  
            <property name="packageAllowed" value="false"/>  
            <property name="protectedAllowed" value="false"/>  
            <property name="publicMemberPattern" value="^seriaVersionUID$"/>  
        </module>
        
        
        <!-- =============重复检查============= -->
        <!-- 逐行地比较所有的代码行，如果有若干行只有缩进有所不同，那么就报告存在重复代码
            min: 允许代码重复的最小行数
            charset: 文件所用的字符集 -->
        <module name="StrictDuplicateCode">  
            <property name="min" value="7"/>  
            <property name="charset" value="UTF-8"/>  
        </module> 
        
        <!-- =============度量检查============= -->
        <!-- 限制一个表达式中的&&、||、&、|、^等逻辑运算符的数量
            max: 布尔运算符在一条语句中允许出现的最大数目 -->
        <module name="BooleanExpressionComplexity">  
            <property name="max" value="7"/>  
        </module>
        
        <!-- 测量给定类中的其他类的实例化操作的次数 -->
        <module name="ClassDataAbstractionCoupling">  
            <property name="max" value="7"/>  
        </module>
        
        <!-- 检查循环复杂度是否超出了指定的限值。
        该复杂度由构造器、方法、静态初始化程序、
        实例初始化程序中的if、while、do、for、?:、catch、switch、case等语句，以及&&和||运算符的数量所测量 -->
        <module name="CyclomaticComplexity">  
            <property name="severity" value="ignore"/>  
        </module>
        
        
        <!-- =============杂项检查============= -->
        <!-- 检查数组定义的风格。有的开发者使用Java风格：public static void main(String[] args)；有的开发者使用C风格：public static void main(String args[]) -->
        <module name="ArrayTypeStyle">  
            <property name="javaStyle" value="true"/>  
        </module>
        
        <!-- 检查方法/构造器的参数是否是final的。这项检查会忽略接口方法的检查 -->
        <module name="FinalParameters"/>
        
        <!-- 检查Java代码的缩进是否正确
            basicOffset: 定义代码体相对于所属的代码体的缩进量
　　　　    braceAdjustment: 定义括号的缩进量
　　　　    caseIndent: 定义case的缩进量 -->
        <module name="Indentation">  
            <property name="basicOffset" value="4"/>  
            <property name="braceAdjustment" value="0"/>  
            <property name="caseIndent" value="4"/>  
        </module>
        
        <!-- 检查文件是否以新行结束 -->
        <module name="NewlineAtEndOfFile"/>
        
        <!-- 这是一项FileSetCheck检查，通过检查关键字的一致性属性文件，它可以确保代码的语言转换的正确性 -->
        <module name="Translation">  
            <property name="severity" value="info"/>  
        </module>
        
        <!-- 检查源码中是否有未注释的main()方法（调试的残留物）
            excludedClasses: 定义可以带main方法的类所匹配的名字形式 -->
        <module name="UncommentedMain">  
            <property name="excludedClasses" value="^$"/>  
        </module>
        
        <!-- 检查long类型的常量在定义时是否由大写的“L”开头 -->
        <module name="UpperEll"/>
    </module>

</module>

```

首先在本地新建一个XML文件，将上面的代码保存到XML文件中，打开Settings->Tools->CheckStyle

![image-20220902214528111](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220902214528111.png)

- **测试配置的CheckStyle**

![image-20220902214552964](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/image-20220902214552964.png)



## 参考文章

[**代码质量 - 统一风格：静态样式检查详解**](https://pdai.tech/md/develop/ut/dev-qt-code-style-1.html)
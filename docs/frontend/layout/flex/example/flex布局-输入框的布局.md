# flex布局-输入框的布局

我们常常需要在输入框的前方添加提示，后方添加按钮。

![img](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/bg2015071324.png)

HTML代码如下。

> ```markup
> <div class="InputAddOn">
>   <span class="InputAddOn-item">...</span>
>   <input class="InputAddOn-field">
>   <button class="InputAddOn-item">...</button>
> </div>
> ```

CSS代码如下。

> ```css
> .InputAddOn {
>   display: flex;
> }
> 
> .InputAddOn-field {
>   flex: 1;
> }
> ```

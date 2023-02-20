# Selenium入门

## 1. 简介

Selenium是 自动化测试工具。它支持各种浏览器，包括 Chrome，Safari，Firefox 等主流界面式浏览器。主要用电脑模拟人操作浏览器网页，可以实现自动化，测试等

## 2. 初步体验

> 忽略安装Selenium 和 浏览器驱动安装和配置，如有需求自行百度

运行如下代码，会自动打开浏览器，然后访问百度。

```
from selenium import webdriver

browser = webdriver.Chrome()
# browser = webdriver.Chrome(r"C:\Users\Administrator\Downloads\chromedriver_win32\chromedriver.exe")
browser.get('http://www.baidu.com/')
```

![image-20210204133157683](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210204133157683.png)

## 3. 模拟提交

下面的代码实现模拟提交搜索功能，首先等页面加载完成，然后输入到搜索框文本，点击提交。

```
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# driver = webdriver.Firefox()
driver = webdriver.Chrome(r"C:\Users\Administrator\Downloads\chromedriver_win32\chromedriver.exe")
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element_by_name("q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()
```

- 其中 driver.get 方法会打开请求的 URL，WebDriver 会等待页面完全加载完成之后才会返回，即程序会等待页面的所有内容加载完成，JS 渲染完毕之后才继续往下执行。注意：如果这里用到了特别多的 Ajax 的话，程序可能不知道是否已经完全加载完毕。

  ```python
  driver.get("http://www.python.org")
  ```

  

- WebDriver 提供了大量的方法让你去查询页面中的元素，这些方法形如： find_element_by_*。 例如：包含 name 属性的input输入框可以通过 find_element_by_name 方法查找到， 详细的查找方法可以在第四节元素查找中查看

  ```python
  elem = driver.find_element_by_name("q")
  ```

- 我们发送了一个关键字，这个方法的作用类似于你用键盘输入关键字

  ```python
  elem.clear()
  elem.send_keys("pycon")
  elem.send_keys(Keys.RETURN)
  ```

## 4. 元素定位

```
find_element_by_id()
find_element_by_name()
find_element_by_class_name()
find_element_by_tag_name()
find_element_by_link_text()
find_element_by_partial_link_text()
find_element_by_xpath()
find_element_by_css_selector()
```

在`element`变成`elements`就是找所有满足的条件，返回数组。

一般我都自己采用 **xpath** 获取元素的，复制即可

![image-20210204134742935](https://zszblog.oss-cn-beijing.aliyuncs.com/zszblog/blogimage-master/img/image-20210204134742935.png)

## 5. 控制浏览器操作

- 控制浏览器窗口大小

```
driver.set_window_size(480, 800)
```

- 浏览器后退，前进

```
# 后退 driver.back()
# 前进 driver.forward()
```

- 刷新

```
driver.refresh() # 刷新
```

## 6. Webelement常用方法

- 点击和输入

```
driver.find_element_by_id("kw").clear() # 清除文本 driver.find_element_by_id("kw").send_keys("selenium") # 模拟按键输入 driver.find_element_by_id("su").click() # 单机元素
```

- 提交

可以在搜索框模拟回车操作

```
search_text = driver.find_element_by_id('kw') search_text.send_keys('selenium') search_text.submit()
```

- 其他

size： 返回元素的尺寸。

text： 获取元素的文本。

get_attribute(name)： 获得属性值。

is_displayed()： 设置该元素是否用户可见。

## 7. 鼠标操作

在 WebDriver 中， 将这些关于鼠标操作的方法封装在 ActionChains 类提供。

ActionChains 类提供了鼠标操作的常用方法：

- perform()： 执行所有 ActionChains 中存储的行为；
- context_click()： 右击；
- double_click()： 双击；
- drag_and_drop()： 拖动；
- move_to_element()： 鼠标悬停。

举个例子：

```python
from selenium import webdriver
# 引入 ActionChains 类
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://www.baidu.cn")

# 定位到要悬停的元素
above = driver.find_element_by_link_text("设置")
# 对定位到的元素执行鼠标悬停操作
ActionChains(driver).move_to_element(above).perform()
```

## 8. 键盘事件

以下为常用的键盘操作：

- send_keys(Keys.BACK_SPACE) 删除键（BackSpace）
- send_keys(Keys.SPACE) 空格键(Space)
- send_keys(Keys.TAB) 制表键(Tab)
- send_keys(Keys.ESCAPE) 回退键（Esc）
- send_keys(Keys.ENTER) 回车键（Enter）
- send_keys(Keys.CONTROL,'a') 全选（Ctrl+A）
- send_keys(Keys.CONTROL,'c') 复制（Ctrl+C）
- send_keys(Keys.CONTROL,'x') 剪切（Ctrl+X）
- send_keys(Keys.CONTROL,'v') 粘贴（Ctrl+V）
- send_keys(Keys.F1) 键盘 F1
- ……
- send_keys(Keys.F12) 键盘 F12

```text
# 输入框输入内容
driver.find_element_by_id("kw").send_keys("seleniumm")

# 删除多输入的一个 m
driver.find_element_by_id("kw").send_keys(Keys.BACK_SPACE)
```

## 9. 警告框处理

```text
alert = driver.switch_to_alert()
```

- text：返回 alert/confirm/prompt 中的文字信息。
- accept()：接受现有警告框。
- dismiss()：解散现有警告框。
- send_keys(keysToSend)：发送文本至警告框。keysToSend：将文本发送至警告框。

## 10. 下拉框选择

```text
from selenium import webdriver
from selenium.webdriver.support.select import Select
from time import sleep

driver = webdriver.Chrome()
driver.implicitly_wait(10)
driver.get('http://www.baidu.com')
sel = driver.find_element_by_xpath("//select[@id='nr']")
Select(sel).select_by_value('50')  # 显示50条
```

## 11. 文件上传

```text
driver.find_element_by_name("file").send_keys('D:\\upload_file.txt')  # # 定位上传按钮，添加本地文件
```

## 12. cookie操作

WebDriver操作cookie的方法：

- get_cookies()： 获得所有cookie信息。
- get_cookie(name)： 返回字典的key为“name”的cookie信息。
- add_cookie(cookie_dict) ： 添加cookie。“cookie_dict”指字典对象，必须有name 和value 值。
- delete_cookie(name,optionsString)：删除cookie信息。“name”是要删除的cookie的名称，“optionsString”是该cookie的选项，目前支持的选项包括“路径”，“域”。
- delete_all_cookies()： 删除所有cookie信息

## 13. 调用JavaScript代码

```text
js="window.scrollTo(100,450);"
driver.execute_script(js) # 通过javascript设置浏览器窗口的滚动条位置
```

通过execute_script()方法执行JavaScripts代码来移动滚动条的位置。

## 14. 窗口截图

```text
driver.get_screenshot_as_file("D:\\baidu_img.jpg") # 截取当前窗口，并指定截图图片的保存位置
```

## 15. 关闭浏览器

- close() 关闭单个窗口
- quit() 关闭所有窗口

## 参考文章

[Selenium Python 教程](https://zhuanlan.zhihu.com/p/111859925)

[selenium官方文档](https://selenium-python-zh.readthedocs.io/en/latest/locating-elements.html)

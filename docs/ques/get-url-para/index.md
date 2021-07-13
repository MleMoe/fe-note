# 获取 URL 中的传参

## 来由

做开发页面需求时，发现经常用 URL 来传递参数，而且也是常见的面试题，于是就总结一下吧。

## URL 获取方法

我第一个项目用的 umi，自带获取 url 参数的能力，`history.location.query` 可以直接拿到 Object 键值对格式的 url 参数对象。

```ts
import { history } from 'umi';

const xx = (history.location.query || {}).xx;
```

第二个项目是 h5 ，没有使用如 umi 之类的框架，所以需要自己处理。

对于 URL，其 的特征如下：

- 就是第一个 `?` 后面的字符串，都是传递的参数
- 参数以 key=value 展示
- 以 `&` 符号分隔
- 有时最后会带上一个#，#后面的内容，并不是传递的参数，而是网页位置的标识符，所以该删去

url 数据源使用浏览器接口 `window.location`

在搜索框搜索：js get url parameter
在 Console 窗口输入 `window.location` ，数据如下：

```js
{
  "ancestorOrigins": {},
  "href": "https://www.google.com.hk/search?q=js+get+url+parameter&newwindow=1&rlz=1C5GCEA_enCN954&ei=_1jlYKqTMYaFr7wPlbSuwAc&oq=js+get+url", // 有省略
  "origin": "https://www.google.com.hk",
  "protocol": "https:",
  "host": "www.google.com.hk",
  "hostname": "www.google.com.hk",
  "port": "",
  "pathname": "/search",
  "search": "?q=js+get+url+parameter&newwindow=1&rlz=1C5GCEA_enCN954&ei=_1jlYKqTMYaFr7wPlbSuwAc&oq=js+get+url", // 有省略
  "hash": ""
}
```

可以看到 `href` 或者 `search` 字段正好是我们想找的内容，解析可以获得 url 参数

好的，直接开整吧！

### 常规切分字符串方法

<<< @/docs/daily/get-url-para/index.ts

### 使用正则表达式

<<< @/docs/daily/get-url-para/regExp.ts

> 正则解析：
> `(^|&)` ：表示匹配以参数名字符串开头或者&字符
> `([ ^&#]*)` ：表示匹配除了&或#之外的字符 0 次或多次 相当于 {0,}
> `($|&}#)` ：表示匹配以字符串结尾或者&字符
> `name` 表示参数名，是一个变量
> 所以这个正则就是想要匹配能够满足：`&name=参数值&|#` 该形式的内容。

关于 `str.match(regexp)` 方法

> 如果使用 g 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
> 如果未使用 g 标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性。

捕获组是一个数组，第一个元素为匹配到的结果，其后为()内容
匹配项的 index，和输入的原字符串，以键值对给出。所以这是个伪数组。

## 参考

- [JS 如何取得 URL 里的参数？](https://juejin.cn/post/6844903856556474381)
- [window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location)
- [str.substring(indexStart[, indexEnd])](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
- [URL 中合法的字符](https://blog.csdn.net/xyh_qianxiao/article/details/92633415)
- [通过正则来获取 URL 的参数值](https://segmentfault.com/a/1190000019205471)
  > 这里没有考虑到 `#` 的情况

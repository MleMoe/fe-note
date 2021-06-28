# 问题，解决，与拓展

## 目录锚点导航

具体描述：点击锚点，页面滚动至该信息块处

使用工具： antd

查看 antd 文档发现，可以有两种方案： Anchor/Link 和 Steps/Step 两种方案。

其中 Anchor/Link 更加符合设计稿，但最终选用 Steps/Step，因为

- Link 组件 使用 # 定位，而页面使用模拟路由，baseurl/addUrl 会变成 baseurl/#id，使页面刷新，且不会显示正确页面内容。
- Link 组件无法自定义 onClick 事件，所以无法阻止 Link 默认点击事件
- Steps 可自定义 onChange 事件，并且传入 current 值，可用于监测当前点击锚点变化。

```js
<Steps
  progressDot
  current={currentIndex}
  labelPlacement='vertical'
  size='small'
  onChange={onChange}
>
  <Step title='XXX' />
</Steps>
```

`onChange` 方法格式为：

```js
/**
   * @ current 当前 index，类型为 number，0-n
   */
onChange(current: number){
  // doSomething
}
```

有两种方式将页面滚动到指定位置，但是第二种方式无法设置偏移，故选用第一种

- `window.scrollTo(options)`: 滚动到文档中的某个坐标。ps：window.scroll 用法一样
- `Element​.scroll​Into​View()`：scrollIntoView()方法会滚动元素的父容器，使被调用 scrollIntoView()的元素对用户可见

接下来需要给信息块设置获取句柄，此处用 className 和 `document.getElementsByClassName` 实现
在每个信息块的 Space 包裹块的 className 设置为各自 type

> ref 在函数组件内不好传值（哪天系统学习一下）

于是可以这么写 onChange 函数

```js
const onChange = (current: number) => {
  const el = document.getElementsByClassName(anchorMapList[current])[0];
  if (el) {
    // 导航栏高度，设置偏移
    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });

    setCurrentIndex(current);
  }
};
```

注意到 `setCurrentIndex(current);` 了吗，这里是为了让 Steps 组件的进度同步，所以使用了 useState

```js
const [currentIndex, setCurrentIndex] = useState(0);
```

就可以了

# 层叠、优先级与继承

## 前言

在某些时候，在做一个项目过程中你会发现一些应该产生效果的样式没有生效。通常的原因是你创建了两个应用于同一个元素的规则。cascade 决定在发生冲突的时候应该使用哪条规则。这里也有继承的概念，也就是在默认情况下，一些 css 属性继承当前元素的父元素上设置的值，有些则不继承。这也可能导致一些和期望不同的结果。

css 规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

浏览器根据优先级，来决定当多个规则/有不同选择器，对应相同的元素的时候，需要使用哪个规则。

继承也需要在上下文中去理解 —— 一些设置在父元素上的 css 属性是可以被子元素继承的（例如 color ），有些则不能（例如 width）。

层叠、优先级和继承，这三个概念一起来控制 css 规则应用于哪个元素。

## 层叠

层叠如何定义在不止一个元素的时候怎么应用 css 规则。有三个因素需要考虑，根据重要性排序如下，前面的更重要：重要程度、优先级、资源顺序。

- 资源顺序
  我们已经看到了顺序对于层叠的重要性。如果你有超过一条规则，而且都是相同的权重，那么最后面的规则会应用。可以理解为后面的规则覆盖前面的规则，直到最后一个开始设置样式。

## 优先级

## 继承

哪些属性属于默认继承很大程度上是由常识决定的。像 widths (上面提到的), margins, padding, 和 borders 不会被继承。如果 borders 可以被继承，每个列表和列表项都会获得一个边框 — 可能就不是我们想要的结果。

## 控制继承

CSS 为控制继承提供了四个特殊的通用属性值。每个 css 属性都接收这些值。

- inherit
  设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".
- initial
  设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit 。
- unset
  将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样
- revert
  只有很少的浏览器支持。

CSS 的 shorthand 属性 all 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个(inherit, initial, unset, or revert)。

## 样式继承

css 样式继承指的是，特定的 css 属性向下传递到 DOM 树后代元素。

对于一些可以继承的属性，可以只设置上级的 CSS 样式表树形，子级（下级）不用设置，会自动继承此 CSS 属性，可以减少 CSS 代码，便于维护。

那么有哪些属性可以自动继承呢？

首先聊聊元素的类别

- 行内元素

  `display: inline`
  又称内联元素
  行内元素不会在新行上启动，只占用必要的宽度。设置宽高无效。

  下面的元素都是行内元素：

  b, big, i, small, tt
  abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
  a, bdo, br, img, map, object, q, script, span, sub, sup
  button, input, label, select, textarea

- 块级元素

  `display: block`

  块级元素始终在新行上显示，并默认占用可用的全宽。除非设置宽高。

  一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更”大型“的结构。

- inline_block 元素

  `display: inline-block`

  自定义属性

  不会在新行上启动，但可以设置宽高。

### 有继承性的属性

1. 字体相关

   > 内联和块级元素都可继承

   font：组合字体样式

   font-family：规定元素的字体系列

   font-weight：设置字体的粗细

   font-size：设置字体的尺寸

   font-style：定义字体的风格

   font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母

   均会被转换为大写，但是所有使用小型大写字体的字母与其余文本

   相比，其字体尺寸更小。

   font-stretch：允许你使文字变宽或变窄。所有主流浏览器都不支持。

   font-size-adjust：为某个元素规定一个 aspect 值，字体的小写字母 "x"

   的高度与"font-size" 高度之间的比率被称为一个字体的 aspect 值。

   这样就可以保持首选字体的 x-height。

2. 文本系列属性

   > 内联元素可以继承除 text-indent 和 text-align 之外的文本属性。块级元素都可以继承。

   text-indent：文本缩进

   text-align：文本水平对齐

   text-shadow：设置文本阴影

   line-height：行高

   word-spacing：增加或减少单词间的空白（即字间隔）

   letter-spacing：增加或减少字符间的空白（字符间距）

   text-transform：控制文本大小写

   direction：规定文本的书写方向

   color：文本颜色

3. 元素可见性：visibility

4. 表格布局属性

   caption-side

   border-collapse

   empty-cells

5. 列表属性

   list-style-type

   list-style-image

   list-style-position、list-style

6. 设置嵌套引用的引号类型：quotes

7. 光标属性：cursor

8. 还有一些不常用的；speak，page 等属性

### 不能继承的属性

1. display

2. 文本属性：vertical-align、text-decoration

3. 盒子模型的属性:宽度、高度、内外边距、边框等

4. 背景属性：背景图片、颜色、位置等

5. 定位属性：浮动、清除浮动、定位 position 等

6. 生成内容属性:content、counter-reset、counter-increment

7. 轮廓样式属性:outline-style、outline-width、outline-color、outline

8. 页面样式属性:size、page-break-before、page-break-after

继承中比较特殊的几点

1. a 标签的字体颜色不能被继承

2. `<h1>-<h6>` 标签字体的大下也是不能被继承的，因为它们都有一个默认值

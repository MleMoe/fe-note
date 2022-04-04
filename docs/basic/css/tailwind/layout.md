# layout

## container

A component for fixing an element's width to the current breakpoint.

`.container` 设置元素的最大宽度以匹配当前断点的最小宽度。

如果你更喜欢为一组固定的屏幕尺寸进行设计，而不是尝试适应完全流畅的 viewports，这将非常有用。

```scss
.container {
  width: 100%;
  &-sm {
    max-width: 640px;
  }
  &-md {
    max-width: 768px;
  }
  &-lg {
    max-width: 1024px;
  }
  &-xl {
    max-width: 1280px;
  }
  &-2xl {
    max-width: 1536px;
  }
}
```

To center a container, use the mx-auto utility:

To add horizontal padding, use the px-{size} utilities:

```html
<div class="container mx-auto px-4">
  <!-- ... -->
</div>
```

The container class also includes responsive variants like container-md that allow you to make something behave like a container at only a certain breakpoint and up:

```html
<!-- Full-width fluid until the `md` breakpoint, then lock to container -->
<div class="md:container md:mx-auto">
  <!-- ... -->
</div>
```

## box-decoration-break

[box-decoration-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-decoration-break) 属性用来定义当元素跨多行、多列或多页时，元素的片段应如何呈现。

> 实验性功能

```scss
.decoration {
  &-slice {
    box-decoration-break: slice;
  }
  &-clone {
    box-decoration-break: clone;
  }
}
```

- slice

  元素被按照盒子被切割前的原始样式渲染，之后，针对每个行/列/页面将此假设框渲染成片段。请注意，假设框对于每个片段可以是不同的，因为如果中断发生在行内方向，则它使用自己的高度，如果中断发生在块方向，则它使用自己的宽度。有关详细信息，请参阅 CSS 规范。

- clone

  每个框片段与指定的边框、填充和边距独立呈现。The border-radius、border-image、 box-shadow 独立地应用于每个片段,每个片段的背景也是独立绘制的, 这意味着使用 background-repeat: no-repeat 的背景图片仍然可能重复多次.

指定的值将影响元素以下属性的表现：

background
border
border-image
box-shadow
clip-path
margin
padding

## box-sizing

Utilities for controlling how the browser should calculate an element's total size.

```scss
.box {
  &-border {
    box-sizing: border-box;
  }
  &-content {
    box-sizing: content-box;
  }
}
```

Use box-border to set an element’s box-sizing to `border-box`, telling the browser to include the element’s borders and padding when you give it a height or width.

This means a 100px × 100px element with a 2px border and 4px of padding on all sides will be rendered as 100px × 100px, with an internal content area of 88px × 88px.

Use box-content to set an element’s box-sizing to `content-box`, telling the browser to add borders and padding on top of the element’s specified width or height.

This means a 100px × 100px element with a 2px border and 4px of padding on all sides will actually be rendered as 112px × 112px, with an internal content area of 100px × 100px.

## display

Utilities for controlling the display box type of an element.

```scss
block {
  display: block;
}
inline-block {
  display: inline-block;
}
inline {
  display: inline;
}
flex {
  display: flex;
}
inline-flex {
  display: inline-flex;
}
table {
  display: table;
}
inline-table {
  display: inline-table;
}
table-caption {
  display: table-caption;
}
table-cell {
  display: table-cell;
}
table-column {
  display: table-column;
}
table-column-group {
  display: table-column-group;
}
table-footer-group {
  display: table-footer-group;
}
table-header-group {
  display: table-header-group;
}
table-row-group {
  display: table-row-group;
}
table-row {
  display: table-row;
}
flow-root {
  display: flow-root;
}
grid {
  display: grid;
}
inline-grid {
  display: inline-grid;
}
contents {
  display: contents;
}
list-item {
  display: list-item;
}
hidden {
  display: none;
}
```

## float

Utilities for controlling the wrapping of content around an element.

```scss
.float {
  &-right {
    float: right;
  }
  &-left {
    float: left;
  }
  &-none {
    float: none;
  }
}
```

## clear

Utilities for controlling the wrapping of content around an element.

使用 clear-left 将元素定位在任何前面的左浮动元素下方。

使用 clear-right 将元素定位在任何前面的右浮动元素下方。

使用 clear-both 将元素定位在所有前面的浮动元素下方。

```scss
.clear {
  &-left {
    clear: left;
  }
  &-right {
    clear: right;
  }
  &-both {
    clear: both;
  }
  &-none {
    clear: none;
  }
}
```

## object-fit

Utilities for controlling how a replaced element's content should be resized.

可以用来适配 img

```scss
.object {
}
&-contain {
  object-fit: contain;
}
&-cover {
  object-fit: cover;
}
&-fill {
  object-fit: fill;
}
&-none {
  object-fit: none;
}
&-scale-down {
  object-fit: scale-down;
}
```

## object-position

Utilities for controlling how a replaced element's content should be positioned within its container.

使用 object-{side} 指定替换元素的内容应如何在其容器中定位。

```scss
.object {
  &-bottom {
    object-position: bottom;
  }
  &-center {
    object-position: center;
  }
  &-left {
    object-position: left;
  }
  &-left-bottom {
    object-position: left bottom;
  }
  &-left-top {
    object-position: left top;
  }
  &-right {
    object-position: right;
  }
  &-right-bottom {
    object-position: right bottom;
  }
  &-right-top {
    object-position: right top;
  }
  &-top {
    object-position: top;
  }
}
```

## overflow

Utilities for controlling how an element handles content that is too large for the container.

```scss
.overflow {
  &-auto {
    overflow: auto;
  }
  &-hidden {
    overflow: hidden;
  }
  &-visible {
    overflow: visible;
  }
  &-scroll {
    overflow: scroll;
  }
  &-x-auto {
    overflow-x: auto;
  }
  &-y-auto {
    overflow-y: auto;
  }
  &-x-hidden {
    overflow-x: hidden;
  }
  &-y-hidden {
    overflow-y: hidden;
  }
  &-x-visible {
    overflow-x: visible;
  }
  &-y-visible {
    overflow-y: visible;
  }
  &-x-scroll {
    overflow-x: scroll;
  }
  &-y-scroll {
    overflow-y: scroll;
  }
}
```

## position

Utilities for controlling how an element is positioned in the DOM.

使用 static 根据文档的正常流来定位元素。
任何偏移（left right etc.）都将被忽略，并且元素不会作为绝对定位子元素的位置参考。

使用 relative 根据文档的正常流来定位元素。
偏移量是相对于元素的正常位置计算的，元素将作为绝对定位子元素的位置参考。

使用 absolute 将元素定位在文档的正常流之外，使相邻元素表现得好像该元素不存在一样。
偏移量是相对于最近的具有非静态位置的父元素计算的，该元素将作为其它绝对定位子元素的位置参考。

使用 fixed 相对于浏览器窗口定位元素。
偏移量是相对于视口计算的，元素将作为绝对定位子项的位置参考。

使用粘性将元素定位为相对元素，直到它超过指定的阈值，然后将其视为固定元素，直到其父元素离开屏幕。
偏移量是相对于元素的正常位置计算的，元素将作为绝对定位子元素的位置参考。

```scss
.static {
  position: static;
}
fixed {
  position: fixed;
}
absolute {
  position: absolute;
}
relative {
  position: relative;
}
sticky {
  position: sticky;
}
```

Use the `{top|right|bottom|left|inset}-0` utilities to anchor absolutely positioned elements against any of the edges of the nearest positioned parent.

## visibile

Utilities for controlling the visibility of an element.

Use invisible to hide an element, but still maintain its place in the DOM, affecting the layout of other elements (compare with .hidden from the display documentation).

```scss
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
```

## z-Index

Utilities for controlling the stack order of an element.

```scss
.z {
  &-0 {
    z-index: 0;
  }
  &-10 {
    z-index: 10;
  }
  &-20 {
    z-index: 20;
  }
  &-30 {
    z-index: 30;
  }
  &-40 {
    z-index: 40;
  }
  &-50 {
    z-index: 50;
  }
  &-auto {
    z-index: auto;
  }
}
```

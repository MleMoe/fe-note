# WebAssembly

## Wasm 是什么

WebAssembly，缩写为 WASM，其定义如下：

webassembly.org

> WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

MDN

> WebAssembly 是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。它设计的目的不是为了手写代码，而是为诸如 C、C++和 Rust 等低级源语言提供一个高效的编译目标。
> 对于网络平台而言，这具有巨大的意义——这为客户端 app 提供了一种在网络平台以接近本地速度的方式运行多种语言编写的代码的方式；在这之前，客户端 app 是不可能做到的。

总的来说，WASM 是一种中间格式，是一种字节码，一个编译目标

![格式](/images/wasm/wasm.webp)

## 为什么有 Wasm

为了效率

1995 年，Javascript 语言创建，速度非常缓慢。
![js-time](/images/wasm/js-time.webp)

2008 年，谷歌 Chrome 出现，带来 V8 引擎和 JIT 即时编译。
有了 JIT，JavaScript 花在各任务上的相对时长变成了这样。
![js-time](/images/wasm/jit-time.webp)

2015 年，WebAssembly 发布。相比之下，WebAssembly 的执行过程是这样的。
![js-time](/images/wasm/wasm-time.webp)

详细来讲，JS 在 v8 引擎中的执行过程。
![v8-js](/images/wasm/v8-js.png)

JavaScript 文件在浏览器中被下载下来后，在 V8 引擎中经历了什么呢？简单来说 V8 引擎通常会经过一下流程：源码 --> AST --> 字节码 --> 二进制代码

- 解析器 Parser 把 JS 代码转化成抽象语法树 AST
- 解释器 Ignition 将 AST 转化成字节码 ByteCode
- 执行 ByteCode 及优化
  在解释执行字节码的过程中，标记重复执行的热点代码，然后把该代码发送给编译器 TurboFan，编译为更高效的机器码储存起来，等到下次再执行到这段代码时，就会用现在的机器码替换原来的字节码进行执行，这样大大提升了代码的执行效率。另外，当 TurboFan 判断一段代码不再为热点代码的时候，会执行去优化的过程，把优化的机器码丢掉，然后执行过程回到 Ignition。

![optimization](/images/wasm/optimization.png)

但是由于 JavaScript 是一种动态类型语言，变量上一秒可能是 Array，下一秒就变成了 Number。那么上一次引擎所做的优化，就失去了作用，此时又要再一次进行优化。

为了解决这个问题，带有类型的 TypeScript 出现了。
可是 TS 对类型的问题做的再好，也始终逃不过要经过 Parser 和 Ignition，这两步是 JavaScript 代码在引擎执行过程当中消耗时间最多的两步。而 Wasm 不用经过这两步，这就是为什么 Wasm 比 TS 快 + 为什么还会有 Wasm 的原因。

## WASM 的使用

Compile a WebAssembly module from…

- C/C++
- Rust
- AssemblyScript (a TypeScript-like syntax)
- C#
- F#
- Go
- Kotlin
- Swift
- D
- Pascal
- Zig

### 以 C/C++为例

#### 准备工具

- cmake

  - 方法 1: [官网](https://cmake.org/)下载
  - 方法 2: mac brew

```bash
brew install cmake
```

- Emscripten

Emscripten 是使用 LLVM 构建的工具链，可将源代码编译为 WebAssembly。

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest

# 环境变量配置（终端会提示）
# on Linux or Mac OS X，在当前终端窗口短暂配置 PATH 等变量
source ./emsdk_env.sh
# 永久配置则将环境变量添加至 .bashrc 或 .zshrc
echo 'source "略/emsdk/emsdk_env.sh"' >> $HOME/.zshrc
```

#### 准备 C 源文件

`EMSCRIPTEN_KEEPALIVE` 表示这个函数需要导出

```C
#include <emscripten/emscripten.h>

#ifdef __cplusplus
extern "C"
{
#endif

int EMSCRIPTEN_KEEPALIVE add(int num) {
  int s = 0;
  for (int i = 1; i <= num; i++) {
      s = s+1;
  }
  return s;
}

#ifdef __cplusplus
}
#endif

```

#### build

CMakeLists.txt

```txt
cmake_minimum_required(VERSION 2.8)
project(WASM)

set( CMAKE_CXX_STANDARD 11 )

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif(NOT CMAKE_BUILD_TYPE)

MESSAGE("Build type: " ${CMAKE_BUILD_TYPE})

# 设置 EMSCRIPTEN 编译选项，绑定'ccall','cwrap'
set(EMSCRIPTEN_LINK_FLAGS "${EMSCRIPTEN_LINK_FLAGS} -s EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap']")

add_executable(add src/add.cc)
set_target_properties( add PROPERTIES LINK_FLAGS "${EMSCRIPTEN_LINK_FLAGS} --bind" )

```

编译脚本

emcmake 和 emmake 是 Emscripten 的编译工具，类似于 cmake 和 make

```bash

if [ ! -d "build" ]; then
  mkdir build
fi
cd build
emcmake cmake ..
emmake make

```

运行 即可编译出 wasm 文件了。

#### 使用

```html
<script type="text/javascript" src="assemblyCpp/build/add.js"></script>
<script>
  const num = 1000000000;
  Module.onRuntimeInitialized = function() {
    const start = new Date().getTime();
    const resultEM = Module._add(num);
    // const result = Module.ccall('add', 'number', ['number'], [num]);
    const end = new Date().getTime();
    console.log('em 用时：', end - start, 'ms');
    console.log('em 结果：', resultEM);
  };
</script>
```

#### 效率比较

运行效率比较(1,000,000,000 次计算)

- js: 1020 ms
- ts: 975 ms
- emscripten(c/c++): 1 ms

#### 代码

[github repo: wasm-start](https://github.com/MleMoe/wasm-start)

## 其它

## Web 标准

在 2019 年，W3C 使 WebAssembly 成为了新的 Web 标准。

### assemblyScript

ts -> wasm

### WASI

Wasm 是中间表示，带来的是创建可移植代码的能力，这意味着用不同语言编写的代码可以在各种平台上运行。不仅如此，还有如下：

- 安全：在沙盒中安全运行不受信任的代码
- 开放：以一种通用的方式将程序与环境互通
- 可移植：与架构无关
- 多语言：由于能够从多种语言中编译出来

Wasm -> outside the web

WASI: the WebAssembly system interface

## 参考

- [webassembly.org](https://webassembly.org/)
- [MDN WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)
- [emscripten](https://emscripten.org/docs/getting_started/index.html)
- [Standardizing WASI: A system interface to run WebAssembly outside the web](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/)
- [了解 wasm 的前世今生](https://juejin.cn/post/6844903709806182413)

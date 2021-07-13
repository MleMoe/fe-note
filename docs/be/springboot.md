# Spring Boot

## 前言

一个 MySql + Spring Boot + React 前后端分离 demo， for ShenShen 。

## 环境准备

### 后端

#### 安装 java

首先，安装 java，正好给我的新机器配一波环境。

对于 mac 而言，直接：

```bash
brew install java
```

然后配置 PATH：

```bash
echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
echo 'export CPPFLAGS="-I/opt/homebrew/opt/openjdk/include"' >> ~/.zshrc
source .zshrc
```

#### 安装 maven

Maven，Java-based project management，一个 Java 的项目管理工具。
安装：

```bash
brew install maven
```

#### 安装 MySql

同样 brew 解决

```bash
# 安装
brew install mysql
# 启动
mysql.server start
# 安全设置（如密码）
mysql_secure_installation
```

然后需要一个 mysql 的 unified visual tool，我常用 mysql workbench，这是 mysql 官方的工具，支持高版本的 mysql，免费（重要）。

```bash
brew install mysqlworkbench
```

然后直接在 workbench 中连接打开 mysql 就可以了。

### IDE 配置

习惯了轻量的 vs code，再用 Eclipse 和 IDEA 这样的重型 IDE，就总觉不得劲。所幸 vs code 有丰富的插件可以使用。

安装两个插件

- Java Extension Pack
- Spring Boot Extension Pack

在设置里配置 maven 的配置文件： 设置 → 搜索 maven→ 找到 java→ 输入 setting.xml 的绝对路径即可
我的路径是 /opt/homebrew/Cellar/maven/3.8.1/libexec/conf/setting.xml，brew 安装完 maven 会提示，其余系统请自查

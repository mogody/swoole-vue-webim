# swoole-vue-webim

这是一个`Web`版的聊天应用，前端基于`Vue`来构建，用`Vuex`来进行状态管理，`webpack`构建；服务端通过`Swoole`来实现。基本功能有单聊、群聊、用户状态、消息状态以及通知信息。



# 如何部署？

## 1.前期准备

需要安装`npm`和`Swoole`，其中还要安装`webpack`来作为构建工具，所以你需要拥有`Linux`系统。具体安装过程可以查看相关工具的文档。



## 2.构建项目

切换到项目目录，安装相关依赖：

```
npm run install
```

构建项目：

```
npm run build
```



## 3.启动服务

其实很简单，启动自动化构建：

```
npm run dev
```

切换到`app`目录，执行：

```
php websocket.php
```

## 4.访问

```
http://localhost:8080
```

![](http://i1.piimg.com/567571/697dbe904510959c.png)

Job done!



# License

MIT
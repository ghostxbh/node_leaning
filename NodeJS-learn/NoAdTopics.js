/**
 *@author xbh
 *@dateTime 2019-03-04 10:34
 *@description node高级话题(异步，部署，性能调优，异常调试等)
 */

/**
 node中的异步和同步怎么理解
 参考答案: node是单线程的，异步是通过一次次的循环事件队列来实现的．同步则是说阻塞式的IO,这在高并发环境会是一个很大的性能问题，所以同步一般只在基础框架的启动时使用，用来加载配置文件，初始化程序什么的．

 有哪些方法可以进行异步流程的控制?
 参考答案: 1) 多层嵌套回调 2)　为每一个回调写单独的函数，函数里边再回调 3) 用第三方框架比方async, q, promise等

 怎样绑定node程序到80端口?
 参考答案: 多种方式 1) sudo 2) apache/nginx代理 3) 用操作系统的firewall iptables进行端口重定向

 有哪些方法可以让node程序遇到错误后自动重启?
 参考答案: 1) runit 2) forever 3) nohup npm start &

 怎样充分利用多个CPU?
 参考答案: 一个CPU运行一个node实例

 怎样调节node执行单元的内存大小?
 参考答案: 用--max-old-space-size 和 --max-new-space-size 来设置 v8 使用内存的上限

 程序总是崩溃，怎样找出问题在哪里?
 参考答案: 1) node --prof 查看哪些函数调用次数多 2) memwatch和heapdump获得内存快照进行对比，查找内存溢出

 有哪些常用方法可以防止程序崩溃?
 参考答案: 1) try-catch-finally 2) EventEmitter/Stream error事件处理 3) domain统一控制 4) jshint静态检查 5) jasmine/mocha进行单元测试

 怎样调试node程序?
 参考答案: node --debug app.js 和node-inspector

 如何捕获NodeJS中的错误，有几种方法? 参考答案: 1) 监听错误事件req.on('error', function(){}), 适用EventEmitter存在的情况; 2) Promise.then.catch(error),适用Promise存在的情况 3) try-catch,适用async-await和js运行时异常，比如undefined object
 */
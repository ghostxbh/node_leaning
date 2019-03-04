/**
 *@author xbh
 *@dateTime 2019-03-04 10:35
 *@description node核心内置类库(事件，流，文件，网络等)
 */

/**
 * @1 node概览
 */

//为什么要用node?
/**
 * 参考答案: 总结起来node有以下几个特点:简单强大，轻量可扩展．
 * 简单体现在node使用的是javascript,json来进行编码，人人都会；
 * 强大体现在非阻塞IO,可以适应分块传输数据，较慢的网络环境，尤其擅长高并发访问；
 * 轻量体现在node本身既是代码，又是服务器，前后端使用统一语言;
 * 可扩展体现在可以轻松应对多实例，多服务器架构，同时有海量的第三方应用组件．
 */

//node的构架是什么样子的?
/**
 * 参考答案: 主要分为三层，应用app >> V8及node内置架构 >> 操作系统.
 * V8是node运行的环境，可以理解为node虚拟机．
 * node内置架构又可分为三层: 核心模块(javascript实现) >> c++绑定 >> libuv + CAes + http.
 */


//node有哪些核心模块?
/**
 * 参考答案: EventEmitter, Stream, FS, Net和全局对象
 */


/**
 * @2 node全局对象
 */

//node有哪些全局对象 ?
/**
 * 参考答案 : process, console, Buffer
 */

//process有哪些常用方法 ?
/**
 * 参考答案 : process.stdin, process.stdout, process.stderr, process.on,
 * process.env, process.argv, process.arch, process.platform, process.exit
 */

//console有哪些常用方法 ?
/**
 * 参考答案 : console.log / console.info, console.error / console.warning, console.time
 * / console.timeEnd, console.trace, console.table
 */

//node有哪些定时功能 ?
/**
 * 参考答案 : setTimeout / clearTimeout, setInterval / clearInterval, setImmediate / clearImmediate, process.nextTick
 */

//node中的事件循环是什么样子的 ?
/**
 * 总体上执行顺序是：process.nextTick >> setImmidate >> setTimeout / SetInterval
 * 看官网吧： https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
 */

//node中的Buffer如何应用 ?
/**
 * 参考答案 : Buffer是用来处理二进制数据的，比如图片，mp3, 数据库文件等.Buffer支持各种编码解码，二进制字符串互转．
 */

/**
 * @3 EventEmitter
 */

//什么是EventEmitter ?
/**
 * 参考答案 : EventEmitter是node中一个实现观察者模式的类，主要功能是监听和发射消息，用于处理多模块交互问题.如何实现一个EventEmitter ?
 * 参考答案 : 主要分三步：定义一个子类，调用构造函数，继承EventEmitter
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function MyEmitter() {
    EventEmitter.call(this);
} // 构造函数

util.inherits(MyEmitter, EventEmitter); // 继承

var em = new MyEmitter();
em.on('hello', function (data) {
    console.log('收到事件hello的数据:', data);
}); // 接收事件，并打印到控制台
em.emit('hello', 'EventEmitter传递消息真方便!');

//EventEmitter有哪些典型应用 ?
/**
 参考答案 :
 1 ) 模块间传递消息
 2 ) 回调函数内外传递消息
 3 ) 处理流数据，因为流是在EventEmitter基础上实现的.
 4 ) 观察者模式发射触发机制相关应用
 */

//怎么捕获EventEmitter的错误事件 ?
/**
 * 参考答案 : 监听error事件即可．如果有多个EventEmitter, 也可以用domain来统一处理错误事件
 */
var domain = require('domain');
var myDomain = domain.create();
myDomain.on('error', function (err) {
    console.log('domain接收到的错误事件:', err);
}); // 接收事件并打印
myDomain.run(function () {
    var emitter1 = new MyEmitter();
    emitter1.emit('error', '错误事件来自emitter1');
    emitter2 = new MyEmitter();
    emitter2.emit('error', '错误事件来自emitter2');
});

//EventEmitter中的newListenser事件有什么用处 ?
/**
 * 参考答案 : newListener可以用来做事件机制的反射，特殊应用，事件管理等．
 * 当任何on事件添加到EventEmitter时，就会触发newListener事件，基于这种模式，我们可以做很多自定义处理.
 */
var emitter3 = new MyEmitter();
emitter3.on('newListener', function (name, listener) {
    console.log("新事件的名字:", name);
    console.log("新事件的代码:", listener);
    setTimeout(function () {
        console.log("我是自定义延时处理机制");
    }, 1000);
});
emitter3.on('hello', function () {
    console.log('hello　node');
});

/**
 * @4 Stream
 */
// 什么是Stream ?
/**
 * 参考答案 : stream是基于事件EventEmitter的数据管理模式．由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型．
 */


//Stream有什么好处 ?
/**
 参考答案 : 非阻塞式数据处理提升效率，片断处理节省内存，管道处理方便可扩展等.Stream有哪些典型应用 ?
 参考答案 : 文件，网络，数据转换，音频视频等.怎么捕获Stream的错误事件 ?
 参考答案 : 监听error事件，方法同EventEmitter.有哪些常用Stream, 分别什么时候使用 ?
 参考答案 : Readable为可被读流，在作为输入数据源时使用；Writable为可被写流, 在作为输出源时使用；
 Duplex为可读写流, 它作为输出源接受被写入，同时又作为输入源被后面的流读出．
 Transform机制和Duplex一样，都是双向流，区别时Transfrom只需要实现一个函数_transfrom(chunk, encoding, callback);
 而Duplex需要分别实现_read(size)函数和_write(chunk, encoding, callback)函数.
 */
//实现一个Writable Stream ?
/**
 参考答案 : 三步走:
 1) 构造函数call Writable
 2) 继承Writable
 3) 实现_write(chunk, encoding, callback)函数
 */
var Writable = require('stream').Writable;
var util = require('util');

function MyWritable(options) {
    Writable.call(this, options);
} // 构造函数
util.inherits(MyWritable, Writable); // 继承自Writable
MyWritable.prototype._write = function (chunk, encoding, callback) {
    console.log("被写入的数据是:", chunk.toString()); // 此处可对写入的数据进行处理
    callback();
};
process.stdin.pipe(new MyWritable()); // stdin作为输入源，MyWritable作为输出源

/**
 * @5 文件系统
 */
//内置的fs模块架构是什么样子的 ?
/**
 参考答案 : fs模块主要由下面几部分组成:
 1) POSIX文件Wrapper, 对应于操作系统的原生文件操作
 2) 文件流fs.createReadStream和fs.createWriteStream
 3) 同步文件读写, fs.readFileSync和fs.writeFileSync
 4) 异步文件读写, fs.readFile和fs.writeFile
 */

//读写一个文件有多少种方法 ?
/**
 参考答案 : 总体来说有四种:
 1) POSIX式低层读写
 2) 流式读写
 3) 同步文件读写
 4) 异步文件读写
 */

//怎么读取json配置文件 ?
/**
 *  参考答案 :
 *  主要有两种方式，
 *  第一种是利用node内置的require('data.json')机制，直接得到js对象;
 *  第二种是读入文件入内容，然后用JSON.parse(content)
 *  转换成js对象．二者的区别是require机制情况下，如果多个模块都加载了同一个json文件，
 *  那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象;
 *  第二种方式则可以随意改变加载后的js变量，而且各模块互不影响，因为他们都是独立的，是多个js对象.
 */

//fs.watch和fs.watchFile有什么区别，怎么应用 ?
/**
 * 参考答案 : 二者主要用来监听文件变动．
 */

//fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统;
/**
 * fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制．
 */

/**
 * @6 网络
 */
//node的网络模块架构是什么样子的 ?
/**
 * 参考答案 : node全面支持各种网络服务器和客户端，包括tcp, http / https, tcp, udp, dns, tls / ssl等.
 */

//node是怎样支持https, tls的 ?
/**
 参考答案 : 主要实现以下几个步骤即可 :
 1 ) openssl生成公钥私钥
 2 ) 服务器或客户端使用https替代http
 3 ) 服务器或客户端加载公钥私钥证书
 */

//实现一个简单的http服务器 ?
/**
 * 参考答案 : 经典又很没毛意义的一个题目．思路是加载http模块，创建服务器，监听端口.
 */


var http = require('http'); // 加载http模块

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); // 200代表状态成功, 文档类型是给浏览器识别用的
    res.write('<meta charset="UTF-8"> <h1>我是标题啊！</h1> <font color="red">这么原生，初级的服务器，下辈子能用着吗?!</font>'); // 返回给客户端的html数据
    res.end(); // 结束输出流
}).listen(3000); // 绑定3ooo, 查看效果请访问 http://localhost:3000
/**
 * @7 child - process
 */

//为什么需要child - process ?
/**
 * 参考答案 : node是异步非阻塞的，这对高并发非常有效．
 * 可是我们还有其它一些常用需求，比如和操作系统shell命令交互，调用可执行文件，创建子进程进行阻塞式访问或高CPU计算等，
 * child - process就是为满足这些需求而生的．child - process顾名思义，就是把node阻塞的工作交给子进程去做．
 */

//exec, execFile, spawn和fork都是做什么用的 ?
/**
 * 参考答案 : exec可以用操作系统原生的方式执行各种命令，如管道cat ab.txt | grep hello; execFile是执行一个文件;
 * spawn是流式和操作系统进行交互; fork是两个node程序(javascript)
 */

//之间时行交互.实现一个简单的命令行交互程序 ?
/**
 * 参考答案 : 那就用spawn吧.
 */
var cp = require('child_process');
var child = cp.spawn('echo', ['你好', "钩子"]); // 执行命令
child.stdout.pipe(process.stdout); // child.stdout是输入流，process.stdout是输出流
// 这句的意思是将子进程的输出作为当前程序的输入流，然后重定向到当前程序的标准输出，即控制台

//两个node程序之间怎样交互 ?
/**
 * 参考答案 : 用fork嘛，上面讲过了．原理是子程序用process.on, process.send，父程序里用child.on, child.send进行交互.
 */
//1)
fork - parent.js
var cp = require('child_process');
var child = cp.fork('./fork-child.js');
child.on('message', function (msg) {
    console.log('老爸从儿子接受到数据:', msg);
});
child.send('我是你爸爸，送关怀来了!');

//2)
fork - child.js
process.on('message', function (msg) {
    console.log("儿子从老爸接收到的数据:", msg);
    process.send("我不要关怀，我要银民币！");
});
//怎样让一个js文件变得像linux命令一样可执行 ?
/**
 * 参考答案 :
 * 1)在myCommand.js文件头部加入#!/usr/bin / env node
 * 2)chmod命令把js文件改为可执行即可
 * 3)进入文件目录，命令行输入myComand就是相当于node myComand.js了
 */


//child - process和process的stdin, stdout, stderror是一样的吗 ?
/**
 * 参考答案 : 概念都是一样的，输入，输出，错误，都是流．区别是在父程序眼里，子程序的stdout是输入流，stdin是输出流．
 */
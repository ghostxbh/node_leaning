/**
 * @Author ghostxbh
 * @DateTime 19/2/16 上午9:50
 * @Description 启动js
 */

//导入Koa,和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

/**
 * 方法一：可以用npm命令直接安装koa。先打开命令提示符，务必把当前目录切换到hello-koa这个目录，然后执行命令：
 * C:\...\hello-koa> npm install koa@2.0.0
 *
 * 方法二：在hello-koa这个目录下创建一个package.json，这个文件描述了我们的hello-koa工程会用到哪些包。完整的文件内容如下：
   {
       "name": "hello-koa2",
       "version": "1.0.0",
       "description": "Hello Koa 2 example with async",
       "main": "app.js",
       "scripts": {
           "start": "node app.js"
       },
       "keywords": [
           "koa",
           "async"
       ],
       "author": "Michael Liao",
       "license": "Apache-2.0",
       "repository": {
           "type": "git",
           "url": "https://github.com/michaelliao/learn-javascript.git"
       },
       "dependencies": {
           "koa": "2.0.0"
       }
   }
   其中，dependencies描述了我们的工程依赖的包以及版本号。其他字段均用来描述项目信息，可任意填写。
   然后，我们在hello-koa目录下执行npm install就可以把所需包以及依赖包一次性全部装好：
   C:\...\hello-koa> npm install
   很显然，第二个方法更靠谱，因为我们只要在package.json正确设置了依赖，npm就会把所有用到的包都装好。
   注意，任何时候都可以直接删除整个node_modules目录，因为用npm install命令可以完整地重新下载所有依赖。并且，这个目录不应该被放入版本控制中。
 */

//创建一个Koa对象即是web app;
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async(ctx,next) => {

  await next();

  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hi,Koa2!</h1>';
});

//监听3000端口
app.listen(3000);
console.log("app server is running : http://localhost:3000");



/**
 参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数。
 上面的异步函数中，我们首先用await next();处理下一个异步函数，然后，设置response的Content-Type和内容。
 由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。
 */

/**
 * middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
 * 示例：可以用以下3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML：
 * app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
   });

  app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
   });

  app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
   });

 * ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
 */
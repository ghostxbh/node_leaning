/**
 * @Author ghostxbh
 * @DateTime 15/02/2019 22:09
 * @Description HTTP服务器
 */

/***
 要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由Node.js自带的http模块完成了。
 应用程序并不直接和HTTP协议打交道，而是操作http模块提供的request和response对象。
 request对象封装了HTTP请求，我们调用request对象的属性和方法就可以拿到所有HTTP请求的信息；
 response对象封装了HTTP响应，我们操作response对象的方法，就可以把HTTP响应返回给浏览器。
 用Node.js实现一个HTTP服务器程序非常简单。我们来实现一个最简单的Web程序hello.js，它对于所有请求，都返回Hello world!
 */
//导入http
var http = require('http');
//创建server服务，并回调
var server = http.createServer(function (request,response) {
    //获取请求方法和url
    console.log(request.method+":"+request.url);
    //response响应200状态码，设置Content-Type,text/html
    response.writeHead(200,"Content-Type","text/html");
    //response响应写入内容
    response.end("<h1>First Node Server</h1>");
})
//服务监听端口
server.listen(8080);
console.log("server is running at http://127.0.0.1:8080");




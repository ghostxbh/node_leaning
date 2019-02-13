/**
 * @Author ghostxbh
 * @DateTime 13/02/2019 21:19
 * @Description 第一个node服务
 */
//helloworld
console.log("hello world!");

//node服务获取http
const http = require('http');
//ip地址
const hostname = '127.0.0.1';
//端口号
const port = '3000';
//响应服务
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world\n' + req.method);
});
//监听服务
server.listen(port, hostname, () => {
    console.log('服务器运行在 http://' + hostname + ':' + port + '/');
});
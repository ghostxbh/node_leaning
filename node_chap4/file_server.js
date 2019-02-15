/**
 * @Author ghostxbh
 * @DateTime 15/02/2019 22:27
 * @Description 文件服务器
 */

//导入url、path、fs、http模块
var url = require('url');
var path = require('path');
var fs = require('fs');
var http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
console.log("root Dir:"+root);

var server = http.createServer(function (request,response) {
    //获取url的路径，如‘img/one.png’
    var pathname = url.parse(request.url).pathname;
    console.log("pathname:"+pathname);

    //获取本地文件路径，如C:\Users\ghost\WebstormProjects\node_leaning\node_chap4\pub\index.html
    var filepath = path.join(root,pathname);
    console.log("filepath:"+defaultpaths);
    var defaultpaths = ['index.html'];
    //获取文件状态
    var f = function(index=0){
        var now_path = path.join(root,defaultpaths[index]);
        fs.stat(now_path,function (err,stats) {
            if (!err && stats.isFile()) {
                console.log("200"+request.url);
                //response响应200
                response.writeHead(200);
                //文件流输入到response
                fs.createWriteStream(filepath).pipe(response);
            }else{
                console.log("404"+request.url);
                response.writeHead(404);
                response.end("404 NOT FOUND");
            }
        })
    }
})

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
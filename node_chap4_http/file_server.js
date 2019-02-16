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
console.log("root Dir:" + root);

var server = http.createServer(function (request, response) {

    //获取url的路径，如‘img/one.png’
    var pathname = url.parse(request.url).pathname;

    //获取本地文件路径，如C:\Users\ghost\WebstormProjects\node_leaning\node_chap4\pub\index.html
    var filepath = path.join(root, pathname);


    //默认文件
    //获取文件状态
    //如果HTTP请求的是目录，则自动在此路径下依次搜索index.html和default.html，
    //若找到，就返回HTML文件的内容
    var defaultPage = ['default.html', 'index.html'];

    var pageCount = 0;
    //默认的页面响应
    function getDefaultPage() {
        if (pageCount === defaultPage.length) {
            get404Page();
            return;
        }

        //判断是否是成功响应页面
        var page = path.join(filepath, defaultPage[pageCount]);
        fs.stat(page, function (err, stats) {
            if (err || !stats.isFile()) {
                pageCount++;
                getDefaultPage();
            } else {
                get200Page(page);
            }
        })
    }

    //404错误异常页面
    function get404Page() {
        //文件不存在，出错的情况
        console.log("404" + request.url);
        response.writeHead(404);
        response.end("404 NOT FOUND");
    }

    //200响应页面
    function get200Page(filepath) {
        console.log("200" + request.url);
        //response响应200
        response.writeHead(200);
        //文件流输入到response
        fs.createReadStream(filepath).pipe(response);
    }

    //fs模块控制输入输出
    fs.stat(filepath, function (err, stats) {
        if (err) {
            get404Page();
        } else if (stats.isFile()) {
            get200Page(filepath);
        } else {
            getDefaultPage();
        }
    })

})

//服务监听端口
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
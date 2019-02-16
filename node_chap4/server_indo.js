/**
 * @Author ghostxbh
 * @DateTime 15/02/2019 22:18
 * @Description 文件服务扩展url、目录路径
 */

/**
 我们可以设定一个目录，然后让Web程序变成一个文件服务器。
 要实现这一点，我们只需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。
 解析URL需要用到Node.js提供的url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象：
 */
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));


var path = require('path');
//解析当前目录
var workDir = path.resolve('.');
console.log(workDir);//C:\Users\ghost\WebstormProjects\node_leaning\node_chap4
//组合完整文件路径：当前目录+pub/index.html
var filePath = path.join(workDir,'pub','index.html');
//C:\Users\ghost\WebstormProjects\node_leaning\node_chap4\pub\index.html

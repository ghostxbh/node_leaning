/**
 * @Author ghostxbh
 * @DateTime 13/02/2019 21:33
 * @Description 回调函数实现阻塞和非阻塞
 * 引用 菜鸟教程
 * Node.js 异步编程的直接体现就是回调。
 * 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。
 * 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
 * 例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。
 * 这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。
 * 回调函数一般作为函数的最后一个参数出现
 */
var fs = require('fs');
//阻塞示例
//同步输出
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("end");

//非阻塞示例
//异步输出
fs.readFile('uzykj.png','utf-8',function (err,data) {
    if (err)return console.error(err);
    console.log(data);
    console.log(data.length+'bytes');
})
console.log('end');

//异步输入
var code = "Hello,My love is Programming!";
fs.writeFile('output.txt',code,function (err) {
    if (err){
       return console.log(err);
    }
    console.log('OK');
});
//同步输入
var te = "Hi,my friend is very joke";
fs.writeFileSync('output.txt',te);

//stat文件对象
//stat()也有一个对应的同步函数statSync()
fs.stat('uzykj.png',function (err,stat) {
    if (err){
        console.log(err);
    }else{
        //是否文件
        console.log('isFile:'+ stat.isFile());
        //是否目录
        console.log('isDirectory:'+ stat.isDirectory());
        if (stat.isFile()){
            //文件大小
            console.log('size:'+ stat.size);
            //文件创建时间
            console.log('birth time:'+stat.birthtime);
            //文件修改时间
            console.log('modified time:'+stat.mtime)
        }
    }
});
var fs = require('fs');
var stat = fs.statSync('input.txt')
console.info('isFile: ' + stat.isFile())
console.info('isDirectory: ' + stat.isDirectory())
if (stat.isFile()) {
    console.info('size: ' + stat.size)
    console.info('birth time: ' + stat.birthtime)
    console.info('modified time: ' + stat.mtime)
}

/**
 * 异步还是同步
 *在fs模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？
 *由于Node环境执行的JavaScript代码是服务器端代码，
 * 所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，
 * 否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。
 *服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，
 * 可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。
 */

 /**
 * 引用网友常用词汇解释
 阻塞和非阻塞，同步和异步是node.js里经常遇到的词汇，我举个简单的例子来说明：
 我要看足球比赛，但是妈妈叫我烧水，电视机在客厅，烧水要在厨房。
 家里有2个水壶，一个是普通的水壶，另一个是水开了会叫的那种水壶。
 我可以：
     用普通的水壶烧，人在边上看着，水开了再去看球。（同步，阻塞）这个是常规做法，但是我看球不爽了。
     用普通水壶烧，人去看球，隔几分钟去厨房看看。（同步，非阻塞）这个又大问题，万一在我离开的几分钟水开了，我就麻烦了。
     用会叫的水壶，人在边上看着。（异步，阻塞）这个没有问题，但是我太傻了。
     用会叫的水壶，人去看球，听见水壶叫了再去看。（异步，非阻塞）这个应该是最好的。
     等着看球的我：阻塞
     看着电视的我：非阻塞
     普通水壶：同步
     会叫的水壶：异步
 所以，异步往往配合非阻塞，才能发挥出威力。
 */
/**
 * @Author ghostxbh
 * @DateTime 14/02/2019 21:40
 * @Description stream 标准流输出输入
 */

var fs = require('fs');
//创建输入流
var rs = fs.createReadStream('rs.txt','utf-8');
//data事件表示流的数据已经可以读取
rs.on('data',function (result) {
    console.log("DATA:"+result);
});
//end事件表示流已到末尾
rs.on('end',function () {
    console.log("readStream end");
});
//error事件表示出错
rs.on('error',function (err) {
    console.log("ERROR："+err);
});

/**
 * data事件可能会有多次，每次传递的chunk是流的一部分数据。
 * 要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束
 */

//输出流
var ws = fs.createWriteStream('ws.txt','utf-8');
ws.write("乐观锁\n");
ws.write("悲观锁");
ws.end();

var ws2 = fs.createWriteStream('ws.txt');
ws2.write(new Buffer('Hi,Boy\n','utf-8'));
ws2.write(new Buffer('输出流二进制输出','utf-8'));
ws2.end();

/**
 * 所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable。
 */


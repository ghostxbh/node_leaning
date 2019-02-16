/**
 * @Author ghostxbh
 * @DateTime 14/02/2019 21:58
 * @Description pipe
 */

/**
 * 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。
 * 一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
 * 在Node.js中，Readable流有一个pipe()方法，就是用来干这件事的。
 * 让我们用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：
 */

var fs = require('fs');
//创建输入输出流
var rs = fs.createReadStream('rs.txt','utf-8');
var ws = fs.createWriteStream('ws.txt','utf-8');
rs.on('end',function () {
    console.log("end");
})
//用pipe()把输入流流入输出流中
rs.pipe(ws);

//默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：
//readable.pipe(writable, { end: false });


/**
 *@author xbh
 *@dateTime 2019-03-04 10:57
 *@description 常用知名第三方类库(Async, Express等)
 */

/**
 *async都有哪些常用方法，分别是怎么用?
 参考答案: async是一个js类库，它的目的是解决js中异常流程难以控制的问题．async不仅适用在node.js里，浏览器中也可以使用．
 async.parallel并行执行完多个函数后，调用结束函数
 */
async.parallel([
    function () {    },
    function () {    }
], callback);

//async.series串行执行完多个函数后，调用结束函数
async.series([
    function () {    },
    function () {    }
]);

//async.waterfall依次执行多个函数，后一个函数以前面函数的结果作为输入参数
async.waterfall([
    function (callback) {
        callback(null, 'one', 'two');
    },
    function (arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function (arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});

//async.map异步执行多个数组，返回结果数组
async.map(['file1', 'file2', 'file3'], fs.stat, function (err, results) {
    // results is now an array of stats for each file
});
//async.filter异步过滤多个数组，返回结果数组
async.filter(['file1', 'file2', 'file3'], fs.exists, function (results) {
    // results now equals an array of the existing files
});

/**
 express项目的目录大致是什么样子的
 参考答案: app.js, package.json, bin/www, public, routes, views.

 express常用函数
 参考答案: express.Router路由组件,app.get路由定向，app.configure配置，app.set设定参数,app.use使用中间件

 express中如何获取路由的参数
 参考答案: /users/:name使用req.params.name来获取; req.body.username则是获得表单传入参数username; express路由支持常用通配符 ?, +, *, and ()

 express response有哪些常用方法
 参考答案: res.download()    弹出文件下载
 res.end()    结束response
 res.json()    返回json
 res.jsonp()    返回jsonp
 res.redirect()    重定向请求
 res.render()    渲染模板
 res.send()    返回多种形式数据
 res.sendFile    返回文件
 res.sendStatus()    返回状态
 */
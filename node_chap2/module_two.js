/**
 * @Author ghostxbh
 * @DateTime 14/02/2019 20:08
 * @Description 模块二，调用模块一的方法，并输出
 */

var get_fun = require("./mudule_one");

var name = "Mathr";

get_fun(name);

/**
 *我们使用Node提供的require函数引入module_one模块
 *使用变量get_fun接收module_one模块，其实get_fun等于module.exports=get_fun，所以我们能直接使用get_fun函数
 */

/**
 *CommonJS规范
 * 这种模块加载机制被称为CommonJS规范。
 * 在这个规范下，每个.js文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突，
 * 例如，hello.js和main.js都申明了全局变量var s = 'xxx'，但互不影响。
 * 一个模块想要对外暴露变量（函数也是变量），可以用module.exports = variable;
 * 一个模块要引用其他模块暴露的变量，用var ref = require('module_name');就拿到了引用模块的变量。
 */
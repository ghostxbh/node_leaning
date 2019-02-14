/**
 * @Author ghostxbh
 * @DateTime 14/02/2019 20:04
 * @Description 模块一，暴露内部方法提供给其他模块使用
 */

var temp = "Hi";

function get_fun(name) {
    console.log(temp+","+name+"!");
}

module.exports=get_fun;
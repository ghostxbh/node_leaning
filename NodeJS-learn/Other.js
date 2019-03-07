/**
 *@author xbh
 *@dateTime 2019-03-04 10:59
 *@description 其它相关后端常用技术(MongoDB, Redis, Apache, Nginx等)
 */

/**
 * mongodb有哪些常用优化措施
 参考答案: 类似传统数据库，索引和分区．

 mongoose是什么？有支持哪些特性?
 参考答案: mongoose是mongodb的文档映射模型．主要由Schema, Model和Instance三个方面组成．
 Schema就是定义数据类型，Model就是把Schema和js类绑定到一起，Instance就是一个对象实例．常见mongoose操作有,save, update, find. findOne, findById, static方法等．

 redis支持哪些功能
 参考答案: set/get, mset/hset/hmset/hmget/hgetall/hkeys, sadd/smembers, publish/subscribe, expire

 redis最简单的应用
 参考答案:
 */
var redis = require("redis"), client = redis.createClient(6379,'127.0.0.1');

client.set("foo_rand000000000000", "some fantastic value");
client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply.toString());
});
client.end();
/**
 apache,nginx有什么区别?
 参考答案: 二者都是代理服务器，功能类似．apache应用简单，相当广泛．nginx在分布式，静态转发方面比较有优势．
 */
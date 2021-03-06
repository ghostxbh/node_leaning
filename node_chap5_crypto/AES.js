/**
 * @Author ghostxbh
 * @DateTime 19/2/16 上午9:50
 * @Description AES 算法
 */

//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
const crypto = require('crypto');

//加密函数
function aesEncrypt(data,key) {
    const cipher = crypto.createCipher('aes192',key);
    var crypted = cipher.update(data,'utf-8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

//解密函数
function aesDecrypt(encrypted,key) {
    const decipher = crypto.createDecipher('aes192',key);
    var decrypted = decipher.update(encrypted,'hex','utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

//原数据
var data = 'this is a great idea , you will be win!';
var key = 'Password!';
//加解密
var encrypted = aesEncrypt(data,key);
var decrypted = aesDecrypt(encrypted,key);

console.log("Data:"+data);
console.log("encrypted:"+encrypted);
console.log("decrypted:"+decrypted);

/**
 * 注意到AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等，
 * AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。
 * 加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。
 * 如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。
 */
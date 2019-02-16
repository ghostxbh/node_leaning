/**
 * @Author ghostxbh
 * @DateTime 19/2/16 上午10:06
 * @Description Diffie-Hellman 算法
 */

/**
 DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：
 小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；
 小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；
 小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。
 在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。
 */

const crypto = require('crypto');

//xiaoming keys
var xiaoming = crypto.createDiffieHellman(512);
var xiaoming_keys = xiaoming.generateKeys();

var prime = xiaoming.getPrime();
var generator = xiaoming.getGenerator();

console.log("prime:" + prime.toString('hex'));
console.log("generator:" + generator.toString('hex'));

//xiaohong keys
var xiaohong = crypto.createDiffieHellman(prime,generator);
var xiaohong_keys = xiaoming.generateKeys();

// exchange and generate secret:
var ming_secret = xiaoming.computeSecret(xiaohong_keys);
//var hong_secret = xiaohong.computeSecret(xiaoming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
//console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));
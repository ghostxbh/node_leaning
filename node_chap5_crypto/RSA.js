/**
 * @Author ghostxbh
 * @DateTime 19/2/16 上午10:40
 * @Description RSA 算法
 */

/**
    RSA算法是一种非对称加密算法，即由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者通过公钥加密，私钥解密。其中，公钥可以公开，私钥必须保密。
    RSA算法是1977年由Ron Rivest、Adi Shamir和Leonard Adleman共同提出的，所以以他们三人的姓氏的头字母命名。

    当小明给小红发送信息时，可以用小明自己的私钥加密，小红用小明的公钥解密，也可以用小红的公钥加密，小红用她自己的私钥解密，这就是非对称加密。
    相比对称加密，非对称加密只需要每个人各自持有自己的私钥，同时公开自己的公钥，不需要像AES那样由两个人共享同一个密钥。
    在使用Node进行RSA加密前，我们先要准备好私钥和公钥。

    首先，在命令行执行以下命令以生成一个RSA密钥对：
    openssl genrsa -aes256 -out rsa-key.pem 2048
    根据提示输入密码，这个密码是用来加密RSA密钥的，加密方式指定为AES256，生成的RSA的密钥长度是2048位。执行成功后，我们获得了加密的rsa-key.pem文件。

    第二步，通过上面的rsa-key.pem加密文件，我们可以导出原始的私钥，命令如下：
    openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
    输入第一步的密码，我们获得了解密后的私钥。

    类似的，我们用下面的命令导出原始的公钥：
    openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
    这样，我们就准备好了原始私钥文件rsa-prv.pem和原始公钥文件rsa-pub.pem，编码格式均为PEM。
    下面，使用crypto模块提供的方法，即可实现非对称加解密。
*/

//首先，我们用私钥加密，公钥解密：
const
    fs = require('fs'),
    crypto = require('crypto');

// 从文件加载key:
function loadKey(file) {
    // key实际上就是PEM编码的字符串:
    return fs.readFileSync(file, 'utf8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

// 使用私钥加密:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));


let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));
//执行后，可以得到解密后的消息，与原始消息相同。

//接下来我们使用公钥加密，私钥解密：

// 使用公钥加密:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

// 使用私钥解密:
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
/**
 执行得到的解密后的消息仍与原始消息相同。
 如果我们把message字符串的长度增加到很长，例如1M，这时，执行RSA加密会得到一个类似这样的错误：
 data too large for key size，这是因为RSA加密的原始信息必须小于Key的长度。那如何用RSA加密一个很长的消息呢？
 实际上，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密原始信息，
 然后用RSA加密AES口令，这样，实际使用RSA时，给对方传的密文分两部分，一部分是AES加密的密文，另一部分是RSA加密的AES口令。
 对方用RSA先解密出AES口令，再用AES解密密文，即可获得明文。

证书
 crypto模块也可以处理数字证书。
 数字证书通常用在SSL连接，也就是Web的https连接。
 一般情况下，https连接只需要处理服务器端的单向认证，如无特殊需求（例如自己作为Root给客户发认证证书），建议用反向代理服务器如Nginx等Web服务器去处理证书。
*/
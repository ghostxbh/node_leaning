/**
 *@author xbh
 *@dateTime 2019-03-04 09:29
 *@description javascript高级话题(面向对象，作用域，闭包，设计模式等)
 */

/**
 * 常用js类定义的方法:主要有构造函数原型和对象创建两种方法
 */
//构造函数方法定义类
console.log('===构造函数方法定义类===');
function person() {
    this.name = 'mj';
}
person.prototype.sayname = function () {
    console.log(this.name);
};
var person = new person();
person.sayname();

//对象创建方法定义类
console.log('===对象创建方法定义类===');
var person = {
    name: 'mj',
    sayname: function () {
        console.log(this.name)
    }
};
var person = Object.create(person);
person.sayname();


/**
 * js类继承的方法:原型链法，属性复制法和构造器应用法. 另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承
 */
//原型链法
console.log('===原型链法===');

function Anna() {
    this.name = 'Anna';
}

Anna.prototype.sayname = function () {
    console.log(this.name);
};

function person() {
}

person.prototype = Anna.prototype; //person继承Anna
person.prototype.constructor = 'person';//跟新构造函数为person
person.sayname();

//属性复制法
console.log('===属性复制法===');

function Anna() {
    this.name = 'Anna';
}

Anna.prototype.sayname = function () {
    console.log(this.name);
};

function person() {
}

for (prop in Anna.prototype) {
    person.prototype[prop] = Anna.prototype[prop];
}
person.prototype.constructor = 'person';
person.sayname();

//构造器应用法
console.log('===构造器应用法===');

function Anna() {
    this.name = 'Anna';
}

Anna.prototype.sayname = function () {
    console.log(this.name);
};

function person() {
    Anna.call(this);//apply, call, bind方法都可以．细微区别，后面会提到．
}

person.sayname();

/**
 * js类多重继承的实现方法: 就是类继承里边的属性复制法来实现．因为当所有父类的prototype属性被复制后，子类自然拥有类似行为和属性
 */

/**
 * js里的作用域: 大多数语言里边都是块作作用域，以{}进行限定，js里边不是．
 * js里边叫函数作用域，就是一个变量在全函数里有效．
 * 比如有个变量p1在函数最后一行定义，第一行也有效，但是值是undefined.
 */
console.log('===js里的作用域===');
var ab = 'angelerbaby';

function test() {
    console.log(ab);
    var ab = 'Janly';
    console.log(ab);
}

test();
console.log(ab);

/**
 * js里边的this: this指的是对象本身，而不是构造函数．
 */
console.log('===js里边的this===');

function wang() {
}

wang.prototype.sayname = function () {
    console.log(this.name)
}
var wang = new wang();
wang.name = 'wangsicong';
wang.sayname();

/**
 * apply, call和bind的区别
 * 三者都可以把一个函数应用到其他对象上，注意不是自身对象．apply,call是直接执行函数调用，bind是绑定，执行需要再次调用．
 * apply和call的区别是apply接受数组作为参数，而call是接受逗号分隔的无限多个参数列表，
 */
console.log('===apply, call和bind的区别===');
function person() {
}
person.prototype.sayname = function () {
    console.log(this.name)
};
var obj = {name: 'joker'};
//apply
person.prototype.sayname.apply(obj, ['li', 'yi', 'feng']);
//call
person.prototype.sayname.call(obj, 'li', 'yi', 'feng');
//bind
var s = person.prototype.sayname.bind(obj);
s('li');

/**
 * caller, callee和arguments分别是
 * caller,callee之间的关系就像是employer和employee之间的关系，就是调用与被调用的关系，二者返回的都是函数对象引用．
 * arguments是函数的所有参数列表，它是一个类数组的变量．
 */
console.log('===caller, callee和arguments===');
function no(param, param1, param2) {
    de(param, param1, param2);
}
function de() {
    console.log(arguments);
    console.log(arguments.callee);
    console.log(de.caller);
}
no('wang', 'zhang', 'sun');

/**
 * 什么是闭包，闭包有哪些用处
 * 闭包这个术语，无论中文翻译还是英文解释都太２Ｂ了，我必须骂人，因为它什么其实都不是．
 * 非要讲它是什么的话，两个字函数，更多字嵌套函数的父子自我引用关系．所有函数都是闭包．
 * 通俗的说，闭包就是作用域范围，因为js是函数作用域，所以函数就是闭包．
 * 全局函数的作用域范围就是全局，所以无须讨论．更多的应用其实是在内嵌函数，这就会涉及到内嵌作用域，或者叫作用域链．
 * 说到内嵌，其实就是父子引用关系(父函数包含子函数，子函数因为函数作用域又引用父函数，这它妈不是死结吗？所以叫闭包），
 * 这就会带来另外一个问题，什么时候引用结束？如果不结束，就会一直占用内存，引起内存泄漏．好吧，不用的时候就引用设为空，死结就解开了．
 */

/**
 * defineProperty, hasOwnProperty, propertyIsEnumerable都是做什么用的
 * Object.defineProperty(obj, prop, descriptor)用来给对象定义属性,有value,writable,configurable,enumerable,set/get等.
 * hasOwnProerty用于检查某一属性是不是存在于对象本身，继承来的父亲的属性不算．
 * propertyIsEnumerable用来检测某一属性是否可遍历，也就是能不能用for..in循环来取到.
 */

/**
 * js常用设计模式的实现思路，单例，工厂，代理，装饰，观察者模式等
 */
console.log('===js常用设计模式的实现思路，单例，工厂，代理，装饰，观察者模式等===');
//1) 单例：　任意对象都是单例，无须特别处理
var obj = {name: 'michaelqin', age: 30};

//2) 工厂: 就是同样形式参数返回不同的实例
function Person() {
    this.name = 'Person1';
}
function Animal() {
    this.name = 'Animal1';
}
function Factory() {
}
Factory.prototype.getInstance = function (className) {
    return eval('new ' + className + '()');
};
var factory = new Factory();
var obj1 = factory.getInstance('Person');
var obj2 = factory.getInstance('Animal');
console.log(obj1.name); // Person1
console.log(obj2.name); // Animal1

//3) 代理: 就是新建个类调用老类的接口,包一下
function Person() {
}
Person.prototype.sayName = function () {
    console.log('michaelqin');
};
Person.prototype.sayAge = function () {
    console.log(30);
};
function PersonProxy() {
    this.person = new Person();
    var that = this;
    this.callMethod = function (functionName) {
        console.log('before proxy:', functionName);
        that.person[functionName](); // 代理
        console.log('after proxy:', functionName);
    }
}
var pp = new PersonProxy();
pp.callMethod('sayName'); // 代理调用Person的方法sayName()
pp.callMethod('sayAge'); // 代理调用Person的方法sayAge()

//4) 观察者: 就是事件模式，比如按钮的onclick这样的应用.
function Publisher() {
    this.listeners = [];
}
Publisher.prototype = {
    'addListener': function (listener) {
        this.listeners.push(listener);
    },

    'removeListener': function (listener) {
        delete this.listeners[this.listeners.indexOf(listener)];
    },

    'notify': function (obj) {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (typeof listener !== 'undefined') {
                listener.process(obj);
            }
        }
    }
}; // 发布者

function Subscriber() {}
Subscriber.prototype = {
    'process': function (obj) {
        console.log(obj);
    }
};　// 订阅者
var publisher = new Publisher();
publisher.addListener(new Subscriber());
publisher.addListener(new Subscriber());
publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者

/**
 * 列举数组相关的常用方法
 * push/pop, shift/unshift, split/join, slice/splice/concat, sort/reverse, map/reduce, forEach, filter
 */

/**
 * 列举字符串相关的常用方法
 * indexOf/lastIndexOf/charAt, split/match/test, slice/substring/substr, toLowerCase/toUpperCase
 */
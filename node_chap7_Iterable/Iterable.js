/**
 *@author xbh
 *@dateTime 2019-03-04 13:21
 *@description
 */
'use strict'
var array = new Array(1,2,3);

var set = new Set(['a','a','v','b']);
var map = new Map([['z','dd'],['x','aa'],['c','ss']]);
console.log('array:');
for (let a of array){
    console.log(a);
}
console.log('set:');
for (let s of set){
    console.log(s);
}
console.log('map:');
for (let m of map){
    console.log(m);
}

/*
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
*/

let s1 = Symbol('s1');
s1.toString();
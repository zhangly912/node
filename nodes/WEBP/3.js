/**
 * 3. 查询字符串
 Node.js 查询字符串处理模块querystring
 学习地址：https://itbilu.com/nodejs/core/Ny8rxFMU.html
 */
var querystring = require('querystring');

/**
  1. 将对象序列化为一个查询字符串：querystring.stringify(obj[, sep][, eq][, options])
  2. 将查询字符串解析为对象：querystring.parse(str[, sep][, eq][, options])
 */
var itbilu = { siteName: 'IT笔录', url: 'http://itbilu.com' };
var stringify = querystring.stringify(itbilu); //这里面加了编码过程
console.log(stringify);
//输出如下
//siteName=IT%E7%AC%94%E5%BD%95&url=http%3A%2F%2Fitbilu.com
var mm = querystring.parse(stringify);
console.log(mm)
    //输出{ siteName: 'IT笔录', url: 'http://itbilu.com' }

//4.解码查询字符串中的参数：querystring.unescape
console.log(querystring.unescape(stringify));
//3. 编码查询字符串中的参数：querystring.escape
console.log(querystring.unescape(querystring.escape('siteName=IT笔录&url=http://itbilu.com')));
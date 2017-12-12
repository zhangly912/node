/**
 2. 路径解析
 对于请求路径HTTP_Parser将其解析为request.url一般而言完整的URL地址如下：
 http://127.0.0.1:8888/p/a/t/h?query=string#hash

 客户端代理（浏览器）会将这个地址解析成报文，将路径和查询部分放在报文的第一行
 需要注意的是hash部分会被丢弃，不会存在报文的任何部分。

 最常见的根据路径解析进行业务处理的是静态文件服务器，它会根据路径去查找
 磁盘中的文件，然后将其响应给客户端，如下所示：
 */
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    fs.readFile(path.join(ROOT, pathname), function(err, file) {
        if (err) {
            request.writeHead(404);
            request.end("找不到相关文件");
            return;
        }
        request.writeHead(200);
        request.end(file);
    });

}).listen(8888);

/**
 node url模块：用于将URL字符串解析为对象或将对象格式化为URL字符串，该模块较为简单，共包括3个方法
 node url模块学习地址： https://itbilu.com/nodejs/core/NJGRdjgU.html#url

 第一个方法：将URL字符串转换为对象：
 url.parse(urlStr[, parseQueryString][, slashesDenoteHost])
 urlStr： 地址
 parseQueryString: false 默认 设置为true会使用querystring模块来解析URL中的查询字符串部分。
 */
var urlString = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
var result = url.parse(urlString, true);
// console.log(result);
/*
Url {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',    如果第二个参数设置为true,这个字段的值是这个query: { query: 'string' },
    pathname: '/p/a/t/h',
    path: '/p/a/t/h?query=string',
    href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
}*/

/**
 第二个方法 将对象转化为URL字符串 ：url.format(urlObj);

 */
var urlObj = {
    protocol: 'http:',
    slashes: true,
    hostname: 'itbilu.com',
    port: 80,
    hash: '#hash',
    search: '?query=string',
    path: '/nodejs?query=string'
}
var result1 = url.format(urlObj);
console.log(result1);

//输出结果如下
//http://itbilu.com:80?query=string#hash

/**
 第三个方法 URL路径处理：url.resolve(from, to)
 */
var aa = url.resolve('/one/two/three', 'four') // '/one/two/four'
var bb = url.resolve('http://example.com/', '/one') // 'http://example.com/one'
var cc = url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
/**
 * 简单说，中间件（middleware）就是处理HTTP请求的函数。
 * 它最大的特点就是，一个中间件处理完，再传递给下一个中间件。
 * App实例在运行过程中，会调用一系列的中间件。
 * 
 * use是express注册中间件的方法，它返回一个函数。
 * 下面是一个连续调用两个中间件的例子。
 */

var express = require("express");
var http = require("http");
var app = express();
app.use(function(request, response, next) {
    if (request.url == "/") {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Welcome to the homepage!\n");
    } else {
        next();
    }
});

app.use(function(request, response, next) {
    if (request.url == "/about") {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Welcome to the about!\n");
    } else {
        next();
    }
});

app.use(function(request, response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error!\n");
});

http.createServer(app).listen(1337);
/*
 * 上面代码使用app.use方法，注册了两个中间件。
 * 收到HTTP请求后，先调用第一个中间件，在控制台输出一行信息，
 * 然后通过next方法，将执行权传给第二个中间件，输出HTTP回应。
 * 由于第二个中间件没有调用next方法，所以request对象就不再向后传递了。

use方法内部可以对访问路径进行判断，据此就能实现简单的路由，
根据不同的请求网址，返回不同的网页内容。
 */
/**
 * 上面代码通过request.url属性，判断请求的网址，从而返回不同的内容。
 * 注意，app.use方法一共登记了三个中间件，只要请求路径匹配，
 * 就不会将执行权交给下一个中间件。因此，最后一个中间件会返回404错误，
 * 即前面的中间件都没匹配请求路径，找不到所要请求的资源。

除了在回调函数内部判断请求的网址，use方法也允许将请求网址写在第一个参数。
这代表，只有请求路径匹配这个参数，后面的中间件才会生效。
无疑，这样写更加清晰和方便。
app.use('/path', someMiddleware);
详见index3.js

 */
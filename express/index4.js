/**
 * Express的方法
 * 
 * 1. all方法和HTTP动词方法
 * 2. set方法
 * set方法用于指定变量的值。
 * get方法用于获取设置的变量
 */

var express = require("express");
var http = require("http");
var app = express();

//使用set方法，为系统变量“views”和“view engine”指定值。
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.all("*", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    next();
});
app.get("/", function(request, response) {
    response.end("Welcome to the homepage!");
});

// app.get("/about", function(request, response) {
//     response.end("Welcome to the about page!");
// });

/**
 * 这些方法的第一个参数，都是请求的路径。
除了绝对匹配以外，Express允许模式匹配。

如果在模式参数后面加上问号，表示该参数可选。

需要注意的是，捕获后需要对网址进行检查，过滤不安全字符，
下面的写法只是为了展示，生产中不应这样直接使用用户提供的值。
**/

//http://localhost:1337/about/1
app.get("/about/:id?", function(request, response) {
    response.end("Welcome to the about" + request.params.id + " page!");
});

app.get("*", function(request, response) {
    response.end("404!");
});

http.createServer(app).listen(1337);
/**
 * 上面代码的all方法表示，所有请求都必须通过该中间件，参数中的“*”表示对所有路径有效。
 * get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。
 * 由于get方法的回调函数没有调用next方法，
 * 所以只要有一个中间件被调用了，后面的中间件就不会再被调用了。
 * 除了get方法以外，Express还提供post、put、delete方法，
 * 即HTTP动词都是Express的方法。
 * 这些方法的第一个参数，都是请求的路径。
 * 除了绝对匹配以外，Express允许模式匹配。
 * 
 * 接下来我们看看index5.js
 * 主要说一些express对request,response对象的封装
 */
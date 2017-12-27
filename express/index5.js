// response 对象
/**
 * response.redirect方法:response.redirect方法允许网址的重定向。
 * 原生的没有这个方法直接跳转 这是中间件封装上去的
 **/
//response.redirect("/hello/anime");
//response.redirect("http://www.example.com");
//response.redirect(301, "http://www.example.com");

/**
 * 2）response.sendFile方法
 * response.sendFile方法用于发送文件。
 */
//response.sendFile("/path/to/anime.mp4");

/**
 * （3）response.render方法
 * response.render方法用于渲染网页模板。
 * 上面代码使用render方法，将message变量传入index模板，渲染成HTML网页。
 */
// app.get("/", function(request, response) {
//     response.render("index", { message: "Hello World" });
// });

//request对象
/**
 * 1. request.ip属性用于获得HTTP请求的IP地址。
 * 2. request.files用于获取上传的文件。
 */

var express = require("express");
var http = require("http");
var app = express();
app.get('/', function(request, response) {
    response.redirect("/index");
});
app.get('/index', function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    //render方法，将message变量传入index模板，渲染成HTML网页。
    response.render("index", { message: "Hello World" });

});
http.createServer(app).listen(9090);
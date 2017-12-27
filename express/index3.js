var express = require("express");
var http = require("http");
var app = express();
//  /会匹配所有的 要注意
// app.use("/", function(req, response, next) {
//     // console.log(req.url)
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to the index page!\n");
// });
app.use("/home", function(req, response, next) {
    console.log(req.url)
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the home page!\n");
});
app.use("/about", function(req, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the about page!\n");
});
app.use(function(req, response, next) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error!\n");
});
http.createServer(app).listen(9090);

/**
 * 
 * 针对不同的请求，Express提供了use方法的一些别名。
 * 比如，上面代码也可以用别名的形式来写。
具体请看index4.js
 */
//我们使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下:
var http = require("http");

//接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 
//函数通过 request, response 参数来接收和响应数据。
http.createServer(function(request, response) {
  // 发送 HTTP 头部 
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  // 
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World\n');

}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');



var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("我是第一个应用");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

// var http = require('http');
// var fs = require('fs');
// var url = require('url');


// // 创建服务器
// http.createServer( function (request, response) {  
//    // 解析请求，包括文件名
//    var pathname = url.parse(request.url).pathname;
//    console.log(url.parse(request.url))
   
//    // 输出请求的文件名
//    console.log("Request for " + pathname + " received.");
   
//    // 从文件系统中读取请求的文件内容
//    //index.html
//    fs.readFile(pathname.substr(1), function (err, data) {
//       if (err) {
//          console.log(err);
//          // HTTP 状态码: 404 : NOT FOUND
//          // Content Type: text/plain
//          response.writeHead(404, {'Content-Type': 'text/html'});
//       }else{           
//          // HTTP 状态码: 200 : OK
//          // Content Type: text/plain
//          response.writeHead(200, {'Content-Type': 'text/html'});  
         
//          // 响应文件内容
//          response.write(data.toString());   
//       }
//       //  发送响应数据
//       response.end();
//    });   
// }).listen(8081);

// // 控制台会输出以下信息
// console.log('Server running at http://127.0.0.1:8081/');
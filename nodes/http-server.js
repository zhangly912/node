//TCP和UDP都属于网络传输层协议，如果要构造高级的网络应用，
//就需要从传输层进行着手。
//node 提供了基本的http和https模块用于HTTP和HTTPS的封装，对于其他应用层协议的
//封装，也能从社区中轻松找到。
//node构建http服务非常容易。

var http = require("http");
http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('hello world\n');
    //res.end('hello world\n');
    //两者的区别在于end会先调用write发送数据，然后发送信号告知响应结束。
    //无论服务器在处理业务的时候是否发生异常，都要在结束时候调用end。不然客户端会一直处于等待状态。
    //当然也可以通过延迟end方法，实现客户端与服务端的长连接，但任务结束时候务必关闭连接。
}).listen(1337, '127.0.0.1');
console.log("server running at http://127.0.0.1:1337/");
//node http-client.js 
//浏览器访问  http://127.0.0.1:1337 打印hello world
//HTTP的全称是超文本传输协议。HTTP是构建在TCP之上，属于应用层协议，
//在HTTP的两端是服务器和浏览器，即著名的B/S模式，如今的web即是HTTP的应用。
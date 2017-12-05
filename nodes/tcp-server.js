var net = require('net');
//创建一个tcp服务器,listener是连接世界connection的侦听器，也可以使用另外一种方法来进行侦听
// var server = net.createServer(function(socket) {
//     socket.on('data', function() {
//         socket.write("你好");
//     });
//     socket.on('end', function(data) {
//         socket.write("连接断开");
//     });
//     socket.write("欢迎使用node.js");
// });
// server.listen(8124, function() {
//     console.log('server bound');
// });

var server = net.createServer();
server.on('connection', function(socket) {
    //新的连接
    socket.on('data', function() {
        socket.write("你好");
    });
    socket.on('end', function(data) {
        socket.write("连接断开");
    });
    socket.write("欢迎使用node.js");
});
server.listen(8124, function() {
    console.log("other server bound")
});
//我们可以使用Telnet工具作为客户端对刚才创建的简单服务器进行会话交流
//telnet 127.0.0.1 8124

//除了端口以外我们还能对Domain Socket进行监听。
//nc -U /tmp/echo.sock
//server.listen('/tmp/echo.sock');
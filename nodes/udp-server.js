//创建udp服务端
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function(msg, rinfo) {
    console.log("server got:" + msg + "from" + rinfo.address + ":" + rinfo.port);
});

//监听客户端发送的消息
server.on("listening", function() {
    var address = server.address();
    console.log("server listening:" + address.address + ":" + address.port);
});
server.bind(41234);
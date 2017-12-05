//创建udp客户端
var dgram = require("dgram");
var message = new Buffer("深入浅出");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 41234, "localhost", function(err, btyes) {
    client.close();
});



//执行 node udp-server.js
//执行 node udp-client.js
//看看执行结果
//server listening 0.0.0.0:41234
//server got:深入浅出from 127.0.0.1:50393


//当套接字对象在用户端时候，可以调用send方法发送消息到网络中，send方法的参数如下
send(buf, offset, length, port, address, [callback]);
//参数：要发送的Buffer,Buffer偏移量，长度，目标端口，目标地址
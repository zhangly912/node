//通过net模块自行构造客户端进行会话，测试tcp-server.js构建的tcp服务
var net = require("net");
var client = net.connect({ post: 8124 }, function() {
    console.log("client connected");
    client.write("world\r\n");
});
client.on("data", function(data) {
    console.log(data.toString());
    client.end();
});
client.on("end", function() {
    console.log("client disconneted");
});
//如果是Domain Socket,填写时写path即可。
//var client = net.connect({path:'/tmp/echo.sock'});

//node tcp-server.js
//node tcp-client.js

//然而会报错。。。。？
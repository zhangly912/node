//node中实现Websocket的依赖包有很多，websocket、ws均可，本文选取ws来实现，首先安装依赖
//npm install ws

//##服务端实现
//使用require()导入ws 库，在端口8080 创建一个新的WebSocket 服务器

//首先来看服务端程序，具体的工作流程分以下几步：
//1. 创建一个WebSocketServer的服务，同时监听8080端口的连接请求。
//2. 每当有新的客户端连接该WebSocket成功时，便将该连接push到连接池的数组中。
//3. 监听message事件，当该事件发生时，遍历连接池，以连接为单位将该消息转发到对应的客户端
//4. 监听close事件，当该事件发生时，将该连接移出连接池

var webSocketServer = require('ws').Server;
var wss = new webSocketServer({ port: 8080 });

//连接池
var clients = []
wss.on("connection", function(ws) {
    //将该请求连接加入连接池
    clients.push(ws);
    ws.on("message", function(message) {
        //广播消息
        clients.forEach(function(ws1) {
            if (ws1 !== ws) {
                ws1.send(message);
            }
        });
    });
    ws.on("close", function(message) {
        //连接关闭时，将其移出连接池
        clients = clients.filter(function(ws1) {
            return ws1 !== ws
        });
    });
});
//客户端代码 详见ws-client.html

//如何发现用户？
/*通过上述的demo可以看到，WebSocket都是基于连接的，
也就是说我们知道data是从那个connection发过来，
但并不知道使用客户端的是李雷或者韩梅梅，这可如何是好？
再想另一种场景，李雷只想给韩梅梅发消息，
不想将消息广播给其他客户端，
此时我们就需要在Server端能够标识用户身份和连接的对应关系。
于是，需要在客户端连接到WebSocket之后，
紧接着再发一次请求，告诉Server我的user_id是多少，
Server将此user_id与connection之间的关系存储在hashmap中，
至此就建立了user_id与connection的对应关系。
当需要发送消息给对应的客户端，从此hashmap中取出对应用户的connection信息，
调用其send方法发出消息即可。
代码调整如 ws-server2.js
*/
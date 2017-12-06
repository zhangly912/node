var WebSocketServer = require('ws').Server,
    webSocketServer = new WebSocketServer({ port: 8080 });
var HashMap = require('hashmap');

// record the client
//保存user_id与connection之间的关系
var userConnectionMap = new HashMap();
var connectNum = 0;

// connection
webSocketServer.on('connection', function(ws) {
    ++connectNum;
    console.log('A client has connected. current connect num is : ' + connectNum);
    ws.on('message', function(message) {
        var objMessage = JSON.parse(message);
        var strType = objMessage['type'];
        switch (strType) {
            case 'online':
                userConnectionMap.set(objMessage['from'], ws);
                break;
            default:
                var targetConnection = userConnectionMap.get(objMessage['to']);
                if (targetConnection) {
                    //消息发送给to对象
                    targetConnection.send(message);
                }
        }
    });
    ws.on('close', function(message) {
        var objMessage = JSON.parse(message);
        //移除来源客户端
        userConnectionMap.remove(objMessage['from']);
    });
});
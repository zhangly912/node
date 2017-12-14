var memwatch = require('memwatch-next');
memwatch.on('stats', function(stats) {
    console.log(stats);
});
var http = require("http");
var leakArray = [];
var leak = function() {
    leakArray.push("leak" + Math.random());
}
http.createServer(function(req, res) {
    leak();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello world");
}).listen(9000);
console.log("服务启动");
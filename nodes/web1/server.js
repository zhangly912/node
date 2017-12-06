var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        //不设置编码 中文会导致乱码显示
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        var content = route(handle, pathname);
        response.write(content);
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;
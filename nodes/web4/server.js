var http = require("http");
var url = require("url");

function start(route, handle) {
    http.createServer(function(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        //这句话会导致后面的图片接受不到
        //request.setEncoding("utf8"); //设置接收数据的编码格式为UTF-8
        route(handle, pathname, response, request);
    }).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
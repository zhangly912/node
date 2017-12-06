var exec = require("child_process").exec;

// function start(response) {
//     console.log("Request handler 'start' was called.");
//     //我们用它来获取当前目录下所有的文件
//     exec("ls -lah", function(error, stdout, stderr) {
//         response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
//         response.write(stdout);
//         response.end();
//     });
// }
//如果想要证明_/start_处理程序中耗时的操作不会阻塞对_/upload_请求作出立即响应的话，
//可以将代码修改为如下形式：
function start(response) {
    console.log("Request handler 'start' was called.");

    exec("find /", { timeout: 10000, maxBuffer: 20000 * 1024 }, function(error, stdout, stderr) {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(stdout);
        response.end();
    });
}




function upload(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;
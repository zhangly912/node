var http = require("http");

function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
/**
 * 请注意，当我们在服务器访问网页时，
 * 我们的服务器可能会输出两次“Request received.”。
 * 那是因为大部分服务器都会在你访问 http://localhost:8888 /
 * 时尝试读取 http://localhost:8888/favicon.ico ) 
 */
/**
 * 
 * 当回调启动，我们的 onRequest() 函数被触发的时候，
 * 有两个参数被传入：request 和 response 。
  它们是对象，你可以使用它们的方法来处理HTTP请求的细节，
  并且响应请求（比如向发出请求的浏览器发回一些东西）。

  所以我们的代码就是：当收到请求时，
  使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type），
  使用 response.write() 函数在HTTP相应主体中发送文本“Hello World"。
  最后，我们调用 response.end() 完成响应。
  目前来说，我们对请求的细节并不在意，所以我们没有使用 request 对象。
 */
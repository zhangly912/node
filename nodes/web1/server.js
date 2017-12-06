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
//web1目录下面是不好的实现 
//为什么呢 因为node是单线程
// 当未来有请求处理程序需要进行非阻塞的操作的时候，我们的应用就“挂”了。
//这里如果我们修改start函数10秒之后才有返回，我们会发现upload请求也会10秒之后才能返回
//原因：原因就是_start()_包含了阻塞操作。形象的说就是“它阻塞了所有其他的处理工作”。
//这显然是个问题，因为Node一向是这样来标榜自己的：“在node中除了代码，所有一切都是并行执行的”。

/**
 这句话的意思是说，Node.js可以在不新增额外线程的情况下，
 依然可以对任务进行并行处理 —— Node.js是单线程的。
 它通过事件轮询（event loop）来实现并行操作，
 对此，我们应该要充分利用这一点 —— 尽可能的避免阻塞操作，
 取而代之，多使用非阻塞操作。

 然而，要用非阻塞操作，我们需要使用回调，
 通过将函数作为参数传递给其他需要花时间做处理的函数（比方说，休眠10秒，或者查询数据库，又或者是进行大量的计算）。
 
 对于Node.js来说，它是这样处理的：“嘿，probablyExpensiveFunction()（译者注：这里指的就是需要花时间处理的函数），
 你继续处理你的事情，我（Node.js线程）先不等你了，
 我继续去处理你后面的代码，请你提供一个callbackFunction()，
 等你处理完之后我会去调用该回调函数的，谢谢！”
 
 现在我们创建web2 写一下正确的非阻塞
 */
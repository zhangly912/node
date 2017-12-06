var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        request.setEncoding("utf8"); //设置接收数据的编码格式为UTF-8
        //注册data事件监听器，用于收集每次接收到的新数据块，并将其赋值给定义的变量

        request.on("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        /**
         最后，我们将请求路由的调用移到_end_事件处理程序中，
         以确保它只会当所有数据接收完毕后才触发，并且只触发一次。
         我们同时还把POST数据传递给请求路由，因为这些数据，请求处理程序会用到。
         */
        request.on("end", function() {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
//好了，以上就是关于处理POST数据的全部内容。


/**
 到目前为止，我们做的已经很好了，但是，我们的应用没有实际用途。

服务器，请求路由以及请求处理程序都已经完成了，
下面让我们按照此前的用例给网站添加交互：用户选择一个文件，上传该文件，然后在浏览器中看到上传的文件。 
为了保持简单，我们假设用户只会上传图片，然后我们应用将该图片显示到浏览器中。

好，下面就一步步来实现，鉴于此前已经对JavaScript原理性技术性的内容做过大量介绍了，
这次我们加快点速度。

要实现该功能，分为如下两步： 首先，让我们来看看如何处理POST请求（非文件上传），
之后，我们使用Node.js的一个用于文件上传的外部模块。
之所以采用这种实现方式有两个理由。

第一，尽管在Node.js中处理基础的POST请求相对比较简单，但在这过程中还是能学到很多。 
第二，用Node.js来处理文件上传（multipart POST请求）是比较复杂的，但，如何使用外部模块却是在内容之内。
 */
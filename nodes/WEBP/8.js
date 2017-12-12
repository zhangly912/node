/**
 片段式地接触完web应用的基础功能和路由功能后，我们发现从响应式hello world的示例
 代码到实际的项目，其实有太多琐碎的细节工作要完成。对于web程序而已我们不希望接触到
 那么多细节性的处理。为此我们引入中间件（muddleware)来简化和隔离这些基础设施与
 业务逻辑之间的细节，让开发者能够关注在业务的开发商，以达到提升开发效率的目的。

 这里的中间件就是为我们封装上文提及的所有HTTP请求细节处理的中间件，开发者
 可以脱离这部分细节，专注业务上面。
 学习地址： http://homeway.me/2015/07/19/understand-http-about-content-type/
Content-Type
1.text/html html
2.text/plain 存文本
3.text/css  css
4.text/javascript  js
5.application/x-www-form-urlencoded  表单
6.multipart/form-data  
7.application/json json
8.application/xml
…
 */
var http = require("http");
http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200);
    res.end(JSON.stringify(req.headers)); //跳转登录页面
}).listen(8888);
```
    var http = require("http");
    http.createServer(function(request,response){
        response.writeHead(200,'content-type':'text/plain');
        response.end('hello world');

    }).listen(8888,'127.0.0.1');
    console.log("server running at http://127.0.0.1:8888");
```
对于一个web应用而言，仅仅是上面这样的响应远远达不到业务的需求，在具体的业务中，我们可能有如下需求。

#### 1. 请求方法的判断
#### 2. URL的路径解析
#### 3. URL中查询字符串的解析
#### 4. Cookie的解析
#### 5. Basic的认证
#### 6. 表单数据的解析
#### 7. 任意格式文件的上传处理

那么我们对应这些需求，来建立对应的js文件，与上述序号匹配

还可能有session会话的需求。尽管node提供的底层api很简单，但是要完成业务需求，还有大量的工作需要做。仅仅一个request事件无法满足需求。但是完成这些需求也不是很难的事情。一切的一切从如下的函数来展开。

function(req,res){
    responed.writeHead(200,'content-type':'text/plain');
    response.end();
}
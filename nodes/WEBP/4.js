/**
 Cookie
 在web应用中请求路径和查询字段对业务很重要，通过他们可以进行很多业务操作
 但是http是一个无状态的协议，现实中业务中却需要一定的状态，否则无法区分用户之间的
 身份。如何标识和认证一个用户，最早的方案就是Cookie(曲奇饼)

 Cookie最早又文本浏览器Lynx合作开发者Lou Montuli在1994年网景公司开发
 Netscape浏览器的第一个版本时发明。它能记录服务器和客户端之间的状态。
 最早的用处就是用来判断用户是否第一次访问网站。

 Cookie的处理分为以下几个步骤：
 服务器想客服端发送 Cookie
 浏览器保存Cookie
 之后每次浏览器都会降Cookie发送给服务器

 客户端发送的 Cookie在请求报文的 Cookie字段中
 HTTP_Parser会将所有的报文字段解析到request.headers上面
 req.headers.cookie。
 */

var http = require("http");
http.createServer(function(req, res) {
    console.log(req.headers.cookie);
    //读取客户端传入的cookie 并且解析保存
    req.cookies = parseCookie(req.headers.cookie);
    if (!req.cookies.isVisit) {
        //服务器往浏览器里面写入cookie
        // res.setHeader('Set-Cookie', serialize('isVisit', '1'));
        //可以是数组一次传多个
        res.setHeader('Set-Cookie', [serialize('isVisit', '1', { 'httpOnly': 'httpOnly' })]);
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end("欢迎第一次来到动物园");
    } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end("欢迎再次来到动物园");

    }
}).listen(8888);

//服务器解析拿到的cookie函数
function parseCookie(cookie) {
    var cookies = {};
    if (!cookie) {
        return cookies;
    }
    var list = cookie.split(";");
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split("=");
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
}

/**
 * 
告知客户端的方式是通过响应报文实现的，响应的Cookie值在set-Cookie字段中。
它的格式与请求中的格式不太一样，规范中对他的定义如下所示：
set-Cookie: name=value; path=/; Expires=Sun, 23-Apr-23 09:01:35 GTM; Domain=.domain.com
 */

//服务端设置cookie给客户端
function serialize(name, val, opt) {
    var pairs = [name + '=' + encodeURI(val)];
    opt = opt || {};
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push("Domain=" + opt.domain);
    if (opt.path) pairs.push("path=" + opt.path);
    if (opt.expires) pairs.push("Expires=" + opt.expires.toUTCString());
    //设置这个值告知浏览器不允许通过document.cookie去修改cookie的值
    if (opt.httpOnly) pairs.push("HttpOnly")
    if (opt.secure) pairs.push("Secure");
    //注意这里有个空格
    return pairs.join("; ");
}

/**
 Cookie性能影响：
 Cookie过多会导致报文头比较大，会影响性能
 */
/**
 Session :
 通过Cookie，浏览器和服务器可以实现状态的记录。
 单cookie并不是完美的，就像会存在体积过大，最为严重的是前后端
 都可以进行修改的问题

 为了解决cookie数据敏感问题， Session应运而生。
 该数据只保留在服务端，客户端无法修改，这样数据的安全性得到了保障，
 而且不需要在协议中每次都被传输。 
 */
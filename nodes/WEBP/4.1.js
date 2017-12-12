//讲一下session  
/**
 虽然在服务端存储数据十分方便，但是如何将每个客户和服务器中的数据一一对应起来
 这里有常见的两种方式
 第一种：基于Cookie来实现用户和数据的映射
 我们将约定的口令放在cookie中，口令被给，映射关系丢失，也无法修改服务端的数据了。
 session的有效期比较短，一般20分钟，如果客户端和服务端20分钟内没有交互，服务器就
 将数据删除。
 一旦服务器启动了session,它将约定一个键值作为session的口令。这个值可以随意约定
 比如Connect默认采用connect_id，Tomcat采用jsessionid等。
 一旦服务器检查到客户端cookie没有携带这个值，它就会生成一个值，这个值是唯一
 且不重复的，并设定了超时时间，一下是生成session的代码：
 */
var sessions = {};
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

function generate() {
    var session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
}

var http = require("http");
http.createServer(function(req, res) {
    req.cookies = parseCookie(req.headers.cookie);
    var id = req.cookies[key];
    if (!id) {
        req.session = generate();
    } else {
        var session = sessions[id];
        if (session) {
            if (session.cookie.expire > (new Date().getTime())) {
                //跟新超时时间
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } else {
                //超时了
                delete sessions[id];
                req.session = generate();
            }
        } else {
            //如果session过期或者不对，也要重新生成session
            req.session = generate();
        }
    }
    handle(req, res);

}).listen(8888);

function handle(req, res) {
    if (!req.session.isVisit) {
        req.session.isVisit = true;
        res.writeHead(200);
        res.end("欢迎第一次来到动物园");
    } else {
        res.writeHead(200);
        res.end("欢迎再次来到动物园");
    }
}
///还没看完  周末找时间补上去










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
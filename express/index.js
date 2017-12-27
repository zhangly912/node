var express = require("express");
var app = express();
var routes = require("./routes")(app);
app.listen(3030);

/**
 * use是express注册中间件的方法，
 * 它返回一个函数。下面是一个连续调用两个中间件的例子。
 */
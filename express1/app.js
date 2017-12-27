var express = require('express');
//生成实例
var app = express();
var path = require("path");
var hbs = require("hbs");
var data = require("./data");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var logger = require('morgan');


app.set('views', path.join(__dirname, 'views'));

//设定port变量，意味访问端口
app.set('port', process.env.PORT || 3000);

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

//使用中间件
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//打印访问log
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());

// app.use(express.methodOverride());
// app.use(app.router);

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static('public'));
app.listen(app.get('port'));

// app.get('/', function(req, res) {
//     var body = 'Hello World';
//     res.setHeader('Content-Type', 'text/plain');
//     res.setHeader('Content-Length', body.length);
//     res.end(body);
// });

// app.get('/api', function(req, res) {
//     res.send({ name: "张三", age: 40 });
// });


/** 可以看到，上面三个模板文件都只有网页主体。
因为网页布局是共享的，
所以布局的部分可以单独新建一个文件
layout.html。  */


app.get('/', function(req, res) {
    res.render('index', {
        title: "最近文章",
        entries: data.getBlogEntries()
    });
    // res.render(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
    res.render('about', { title: '关于我们' });
    // res.render(__dirname + '/views/about.html');
});

app.get('/article/:id', (req, res) => {
    var entry = data.getBlogEntry(req.params.id);
    res.render('article', { title: entry.title, blog: entry });
    // res.render(__dirname + '/views/article.html');
})

app.get('*', (req, res) => {
    res.end('404 not found');
});

/**
 * 上面代码改用render方法，对网页模板进行渲染。
 * render方法的参数就是模板的文件名，
 * 默认放在子目录views之中，
 * 后缀名已经在前面指定为html，这里可以省略。
 * 所以，res.render(‘index’) 就是指，
 * 把子目录views下面的index.html文件，交给模板引擎hbs渲染。
 */
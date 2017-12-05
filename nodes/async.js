 //npm install --save async

var async = require("async");
var fs = require("fs");
var Bagpipe = require("bagpipe");
var bagpipe = new Bagpipe(10);

// console.log(async)

var inc = function(n, callback, timeout) {
  //将参数n自增1之后的结果返回给async
    timeout = timeout || 200;
    setTimeout(function() {
        callback(null, n+1);
    }, timeout);
};


// async.series([
//   function(callback){
//     inc(2,callback);
//   },
//   function(callback){
//     inc(1,callback);
//   },
// ],function(error,results){
//   console.log(results);
// });

// async.parallel([
//   function(callback){
//     inc(2,callback);
//     console.log(2);
//   },
//   function(callback){
//     inc(1,callback);
//     console.log(1);
//   },
// ],function(error,results){
//   console.log(results);
// });

// async.waterfall([
//   function(callback){
//     inc(2,callback);
//   },
//   function(n,callback){
//     inc(n,callback);
//   },
// ],function(error,results){
//   console.log(results);

// });

//自动依赖处理
// var deps = {
//   readConfig:function (callback) {
//    setTimeout(function (argument) {
//      callback(null,'从磁盘读取配置文件');
//    },200)
//   },
//   connectMongDB:['readConfig',function (read,callback) {
//    callback(null,read.readConfig+'根据配置文件链接MongoDB');
//   }],
//   connectRedis:['readConfig',function (read,callback) {
//      callback(null,read.readConfig+"根据配置文件链接Redis");
//   }],
//   compileAsserts:function (callback) {
//     setTimeout(function (argument) {
//       callback(null,'编辑静态文件');
//     },2000)
//   },
//   uploadAsserts:['compileAsserts',function (read,callback) {
//     callback(null,read.compileAsserts+"上传静态资源到CDN");
//   }],
//   startup:['connectMongDB','connectRedis','uploadAsserts',function (results) {
//     console.log(results);
//   }]

// };
// async.auto(deps);

/*

  可以看出，异步I/O和同步的I/O的显著差别：同步I/O因为彼此阻塞，在循环体中，总是一个接着一个调用，
  不会出现耗用文件描述符太多的情况，同时性能也是低下的；对于异步I/O，虽然并发容易实现，但是由于太容易
  实现，依然需要控制。换言之，尽管要压榨底层系统的性能，但是还是需要给予一定的过载保护，以防过犹不及。

*/


// var files = ['./after.js','./event.js',];
// for(var i=0;i<2000;i++){
//   files.push("./index.html");
// }
// for (var j = 0; j < files.length; j++) {
//   fs.readFile( files[j],'utf-8',function (err,data) {
//     console.log(i+":"+data);
//   });
// }



// var files = ['./after.js','./event.js',];
// for(var i=0;i<2000;i++){
//   files.push("./index.html");
// }
// for (var i = 0; i < files.length; i++) {
//   bagpipe.push(fs.readFile, files[i], 'utf-8', function (err, data) {
//     console.log(data);
//   });
// }



//这段代码会导致内存这个return的中间函数无法释放，也会使得原始的作用域无法释放。
var foo = function () {
  var bar = function () {
    var local = '局部变量';
    return function(){
      return local;
    }
  };
  var baz = bar();
  console.log(baz());
}
foo();










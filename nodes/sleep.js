//node没有线程沉睡的功能。
//以下代码是持续占用CPU进行判断，与真正的线程沉睡相去甚远，完全破坏了事件循环的调动。
//由于node单线程的原因，CPU资源全部都为这段代码服务，导致其他的任何请求都不会得到响应。
// var start = new Date();
// while(new Date()-start<1000){
//   console.log(33);
// }
// console.log("我是想要阻塞的事情");

var EventEmitter = require("events");
var eventEmitter = new EventEmitter();
//这个代码必须在todo事件之前注册 不然不会执行
eventEmitter.once("newListener", function(event, listener) {
  if (event === 'todo') {
    eventEmitter.on("todo", function() {
      console.log("g");
    })
  }
});
//覆盖错误事件
eventEmitter.on('error', function(e) {
  console.log('我是错误原因' + e);
});

eventEmitter.on('todo', function(a, b) {
  try {
    var c = a + b + '';
    c = c.toFixed(2);
    console.log(c);
  } catch (e) {
    //捕获错误
    eventEmitter.emit("error", e);
  }
});

eventEmitter.emit("todo", 1.222, 2);

//从另外一个角度来说，事件侦听也是一种钩子（hook)机制,利用钩子导出内部数据或者状态给外部的调用组，
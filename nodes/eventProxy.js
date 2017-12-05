//使用 eventproxy 控制并发
//这个eventProxy不属于内建模块，需要自己安装 

//1. 内部包含事件代理机制，能避免多重回调嵌套问题
//2. 符合CMD，AMD及CommonJS等其它的模块设计标准
//3. 包装友好的回调处理监听器，包含标准的Node.js错误处理方法
//4. 兼容多平台，能够被应用到Node.js和各种浏览器环境中
var EventProxy = require("eventProxy");
var EventEmitter = require("events");
var eventEmitter = new EventEmitter();

// var eventProxy = new EventProxy();


// eventProxy.all('event1','event2',function (data1,data2) {
//   console.log(data1+data2);
// });
var eventProxy =  EventProxy.create("event1",'event2',function (data1,data2) {
  console.log(data1+data2);
});

setTimeout(function (argument) {
  eventProxy.emit("event1",3);
},100);

setTimeout(function (argument) {
  eventProxy.emit("event2",4);
},100);




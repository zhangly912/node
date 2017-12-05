//以下实例通过connection事件演示 EventEmitter类的应用。


var events = require("events");
var eventEmitter = new events.EventEmitter();

//监听器

var listener1 = function listener1(){
  console.log("监听器lister1执行");
}

var listener2 = function listener2() {
  console.log("监听器listener2执行");
}

//绑定connection 事件，处理函数为listener1
eventEmitter.addListener('connection',listener1);

//绑定connection 事件，处理函数为listener2
eventEmitter.addListener('connection',listener2);


var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+"个监听器监听连接事件");

//处理connection 事件
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");


// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");



//$ node main.js
//2 个监听器监听连接事件。
//监听器 listener1 执行。
//监听器 listener2 执行。
//listener1 不再受监听。
//监听器 listener2 执行。
//1 个监听器监听连接事件。
//程序执行完毕。
//event.js 文件

// 引入 events 模块
var events = require('events'); 

// 创建 eventEmitter 对象   EventEmitter 的核心就是事件触发与事件监听器功能的封装。
var emitter = new events.EventEmitter(); 
//定义监听
emitter.on('someEvent', function(arg1, arg2) { 
  console.log('listener1', arg1, arg2); 
}); 

emitter.on('someEvent', function(arg1, arg2) { 
  console.log('listener2', arg1, arg2); 
}); 

//触发监听
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

//cli node event.js
//listener1 arg1 参数 arg2 参数
//listener2 arg1 参数 arg2 参数


var events = require("events");
var emitter = new events().EventEmitter();
emitter.on("someEvent",function (arg1,arg2) {
  console.log('listener1',arg1,arg2);
});
emitter.on("someEvent",function (arg1,arg2) {
  console.log('listener2',arg1,arg2);
});
emitter.emit("someEvent",'arg1 参数','argw 参数');




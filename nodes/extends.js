// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {};

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');



//继承
//Node在util模块中封装了继承的方法，可以很便利的去调用。
var events = require("events");
var util = require("util");
function Stream(){
  events.EventEmitter.call(this);
}
util.inherits(Stream,events.EventEmitter);
var myEmitter = new Stream();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.once('event', () => {
  console.log('只执行一次!');
});

myEmitter.emit('event');
myEmitter.emit('event');
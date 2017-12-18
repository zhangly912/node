var util = require("util");

/**
 * 1. 格式化输出字符串：util.format(format[, ...])
 * 
 * format <string> 一个类似 printf 的格式字符串。
util.format() 方法返回一个格式化后的字符串，使用第一个参数作为一个类似 printf 的格式。
第一个参数是一个字符串，包含零个或多个占位符。 每个占位符会被对应参数转换后的值所替换。 支持的占位符有：
%s - 字符串。
%d - 数值（整数或浮点数）。
%i - Integer.
%f - Floating point value.
%j - JSON。如果参数包含循环引用，则用字符串 '[Circular]' 替换。
%o - Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() with options { showHidden: true, depth: 4, showProxy: true }. This will show the full object including non-enumerable symbols and properties.
%O - Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() without options. This will show the full object not including non-enumerable symbols and properties.
%% - 单个百分号（'%'）。不消耗参数。
如果占位符没有对应的参数，则占位符不被替换。
 */

console.log(util.format('%i', '22.22')); //22
console.log(util.format('%j', '{id:2,name:22}')); //"{id:2,name:22}"


/**
 * 2. 在控制台标准输出：util.log(string)
 * printf方法用于在控制台stdout输出，输出带有时间戳。
 */
util.log("这是一个输出"); //18 Dec 13:21:51 - 这是一个输出

/**
 * 3. 将对象序列化为字符串：util.inspect(object[, options])
 * inspect方法用于将对象序列化为字符串，这一方法在调试代码查看对象结构时非常有用。
 * 其可选参数可选值如下：
 * showHidden - 是否枚举显示对象的隐藏属性。默认为 false
 * depth - 设置对象枚举显示的深度。默认为2，设置为null时将无穷递归显示
 * colors - 如果设为true，将会以ANSI颜色代码风格进行输出。默认为 false
 * customInspect - 如果设为 false，那么定义在被检查对象上的inspect(depth, opts) 方法将不会被调用。 默认为true。
 */
//console.log(util.inspect(util, { showHidden: true, depth: null }));
var obj = {
    a: 1,
    b: function() {
        return this.a + 1;
    },
    c: {
        info: {}
    }
}
console.log(util.inspect(obj, { showHidden: true, depth: null, colors: true }))

/**
 * 4. 检查对象是否是数组：util.isArray(object)
 * isArray()方法用于检查传入对象是否是数据，
 * isArray()方法会首先使用ECMAScript5中的Array.isArray()方法和typeof操作符等进行检查，
 * 以确保检查结果的正确性。几种使用示例如下：
 */
console.log(util.isArray([])) // true
console.log(util.isArray(new Array)) // true
console.log(util.isArray({})) // false


/**
 * 5. 检查对象是否是RegExp类型：util.isRegExp(object)
 * isRegExp方法用于检查对象是否是RegExp类型，即是否为正则表达式对象。
 * 几种使用示例如下：
 */

console.log(util.isRegExp(/some regexp/)) // true
console.log(util.isRegExp(new RegExp('another regexp'))) // true
console.log(util.isRegExp({})) // false

/**
 * 6. 检查对象是否是Date类型：util.isDate(object)
 */
util.isDate(new Date()) // true
util.isDate(Date()) // false (without 'new' returns a String)

/**
 * 7. 检查对象是否是Error类型： util.isError(object)
 */
util.isError(new Error()) // true
util.isError(new TypeError()) // true
util.isError({ name: 'Error', message: 'an error occurred' }) // false

/**
 * 8. 实现对象间原型继承：
 * util.inherits(constructor, superConstructor)
 * 
 * util.inherits(constructor, superConstructor)是一个实现对象间原型继承的方法。
 * JavaScript 的面向对象特性是基于原型的继承，与常见的基于类的不同，
 * JavaScript 没有提供对象继承的语言级别特性，而是通过原型链复制来实现的。
 * inherits方法可以将父类原型链上的方法复制到子类中，实现原型式继承。
使用示例，实现一型式继承：
 */
const EventEmitter = require('events');

function MyStream() {
    EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit('data', data);
};

const stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data', (data) => {
    console.log(`接收的数据："${data}"`);
});
stream.write('运作良好！'); // 接收的数据："运作良好！"

console.log(util.isBoolean(1)); //false
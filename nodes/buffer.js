/*

概述：

Buffer对象是Node处理二进制数据的一个接口。
它是Node原生提供的全局对象，可以直接使用，不需要require('buffer')。
JavaScript比较擅长处理字符串，对于处理二进制数据（比如TCP数据流），就不太擅长。
Buffer对象就是为了解决这个问题而设计的。
它是一个构造函数，生成的实例代表了V8引擎分配的一段内存，是一个类似数组的对象，成员都为0到255的整数值，即一个8位的字节。

*/

/*
1.生成一个256字节的Buffer实例
*/
var bytes = new Buffer(256);

// 遍历每个字节，写入内容
for (var i = 0; i < bytes.length; i++) {
  bytes[i] = i;
}

// 生成一个buffer的view
// 从240字节到256字节
var end = bytes.slice(240, 256);

end[0] // 240
end[0] = 0;
end[0] // 0

//上面代码演示了如何生成Buffer对象实例，以及它的赋值和取值。
//除了直接赋值，Buffer实例还可以拷贝生成。

var bytes1 = new Buffer(8);

for (var i = 0; i < bytes1.length; i++) {
  bytes1[i] = i;
}

var more = new Buffer(4);
bytes1.copy(more, 0, 4, 8);
more[0] // 4
//上面代码中，copy方法将bytes实例的4号成员到7号成员的这一段，
//都拷贝到了more实例从0号成员开始的区域。

/*
类的方法2，3，4，5
*/

/*
2.Buffer.isBuffer方法接受一个对象作为参数，返回一个布尔值，表示该对象是否为Buffer实例。
*/
console.log(Buffer.isBuffer(Date)) //false

/*
3.Buffer.isEncoding方法返回一个布尔值。
Buffer对象支持以下编码格式有限，只有少数的几种编码类型可以在字符串和Buffer之间转换。
为此，提供了 isEncoding函数来判断是否支持转换。
 3.1 ascii
 3.2 utf8
 3.3 utf16le：UTF-16的小端编码，支持大于U+10000的四字节字符。
 3.4 ucs2：utf16le的别名。
 3.5 base64
 3.6 hex：将每个字节转为两个十六进制字符。
*/
Buffer.isEncoding('utf8')

/*
4.Buffer.byteLength方法返回字符串实际占据的字节长度，默认编码方式为utf8。
*/ 
console.log(Buffer.byteLength('Hello', 'utf8'))// 5


/* 
5.Buffer.concat方法将一组Buffer对象合并为一个Buffer对象。
*/
var i1 = new Buffer('Hello');
var i2 = new Buffer(' ');
var i3 = new Buffer('World');
console.log(Buffer.concat([i1, i2, i3]).toString())// 'Hello World'
console.log(Buffer.concat([i1, i2, i3], 10).toString())// 'Hello Worl'Buffer.concat方法还可以接受第二个参数，指定合并后Buffer对象的总长度。


/*

实例方法6,7,8

*/


/*
buf.write(string,[offset],[length],[encoding])
6.write方法可以向指定的Buffer对象写入数据。它的第一个参数是所写入的内容，第二个参数（可省略）是所写入的起始位置（默认从0开始），第三个参数（可省略）是编码方式，默认为utf8。
*/

var buf = new Buffer(6);
buf.write('He');
buf.write('l', 2);
buf.write('窝', 3); //如果长度设置为5个字节，窝字无法写入，可以看出汉字在utf-8里面占用三个字节
console.log(buf.toString());

/*
7.toString方法将Buffer实例，按照指定编码（默认为utf8）转为字符串。
buf.toString([encoding],[start],[end])
*/

var hello = new Buffer('Hello');
hello // <Buffer 48 65 6c 6c 6f>
hello.toString() // "Hello"
console.log('我是读取部分字符串'+hello.toString('utf8', 0, 2))
console.log();



/*
8.slice方法返回一个按照指定位置、从原对象切割出来的Buffer实例。它的两个参数分别为切割的起始位置和终止位置。
*/
var buf = new Buffer('just some data');
var chunk = buf.slice(5, 9);
console.log(chunk.toString());//some

/*
9. toJSON方法将Buffer实例转为JSON对象。
如果JSON.stringify方法调用Buffer实例，默认会先调用toJSON方法。
*/

var buf3 = new Buffer('test');
var json = JSON.stringify(buf3);
console.log(json) // '[116,101,115,116]'

var copy = new Buffer(JSON.parse(json));
console.log(copy) // <Buffer 74 65 73 74>


/*
10. Buffer构造函数
Buffer作为构造函数，可以用new命令生成一个实例，它可以接受多种形式的参数。
*/

// 参数是整数，指定分配多少个字节内存
var hello = new Buffer(5);

// 参数是数组，数组成员必须是整数值
var hello = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log('参数是数组，数组成员必须是整数值')
console.log(hello.toString()) // 'Hello'

// 参数是字符串（默认为utf8编码）
var hello = new Buffer('Hello');
console.log(hello.length) // 5
console.log(hello.toString()) // "Hello"

// 参数是字符串（不省略编码）
// var hello = new Buffer('Hello', 'utf8');

// 参数是另一个Buffer实例，等同于拷贝后者
var hello1 = new Buffer('Hello');
var hello2 = new Buffer(hello1);

//下面是读取用户命令行输入的例子。
var fs = require('fs');
var buffer2 = new Buffer(1024);
var readSize = fs.readSync(fs.openSync('/dev/tty', 'r'), buffer2, 0, 1024);
var chunk = buffer2.toString('utf8', 0, readSize);

console.log('INPUT: ' + chunk);

/*
11.实例属性
length属性返回Buffer对象所占据的内存长度。注意，这个值与Buffer对象的内容无关。

buf = new Buffer(1234);
buf.length // 1234

buf.write("some string", 0, "ascii");
buf.length // 1234
*/


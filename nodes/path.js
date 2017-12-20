/**

path.join方法用于连接路径。
该方法的主要用途在于，会正确使用当前系统的路径分隔符，
Unix系统是”/“，Windows系统是”\“。
**/
var path = require('path');
//  /Users/zhanglinyu/Downloads/study/node/nodes/server.js
var aa = path.join(__dirname, './server.js');
console.log(aa)

/**
path.resolve方法用于将相对路径转为绝对路径。

它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。
如果根据参数无法得到绝对路径，就以当前所在路径作为基准。
除了根目录，该方法的返回值都不带尾部的斜杠。

path.resolve([from ...], to)

path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
这个代码实例执行效果如下
$ cd foo/bar
$ cd /tmp/file/
$ cd .. //返回上一级目录
$ cd a/../subfile
$ pwd
**/

var bb = path.resolve(__dirname, './server.js');
var cc = path.resolve('./web3/', 'index.js');
//  /Users/zhanglinyu/Downloads/study/node/nodes/server.js
console.log(bb)
    //  /Users/zhanglinyu/Downloads/study/node/nodes/web3/index.js
console.log(cc)


/**
 * 3.accessSync()
accessSync方法用于同步读取一个路径。

 */

var fs = require("fs");

function exists(pth, mode) {
    try {
        fs.accessSync(pth, mode);
        return true;
    } catch (e) {
        return false;
    }
}
console.log(exists('./web3')); //true
console.log(exists('./web5')); //false

/**
 * 4.path.relative
path.relative方法接受两个参数，这两个参数都应该是绝对路径。
该方法返回第二个路径相对于第一个路径的那个相对路径。
 */

let dd = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
console.log(dd); // '../../impl/bbb'

/**
 * 5.path.parse()
path.parse()方法可以返回路径各部分的信息。
 */

var myFilePath = '/someDir/someFile.json';
path.parse(myFilePath).base
    // "someFile.json"
path.parse(myFilePath).name
    // "someFile"
path.parse(myFilePath).ext
    // ".json"
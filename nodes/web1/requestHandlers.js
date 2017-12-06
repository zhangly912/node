// function start() {
//     return '你好 start';

// }
// var exec = require("child_process").exec;

// function start() {
//     console.log("Request handler 'start' was called.");
//     var content = "empty";

//     exec("ls -lah",
//         function(error, stdout, stderr) {
//             content = stdout;
//         });
//     return content;
// }
//上述代码中，我们引入了一个新的Node.js模块，child_process。
//之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
/**
 _exec()做了什么呢？它从Node.js来执行一个shell命令。
 在上述例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）,
 然后，当/start_URL请求的时候将文件信息输出到浏览器中。

 上述代码是非常直观的： 创建了一个新的变量_content_（初始值为“empty”），
 执行“ls -lah”命令，将结果赋值给content，最后将content返回。

 //返回的是empty
 现在就到了问题根源所在了：我们的代码是同步执行的，
 这就意味着在调用_exec()_之后，Node.js会立即执行 return content ；
 在这个时候，_content_仍然是“empty”，
 因为传递给_exec()_的回调函数还未执行到——因为_exec()_的操作是异步的。

 以上是错误的非阻塞应用
 */

function upload() {
    return '你好 upload';
}

exports.start = start;
exports.upload = upload;
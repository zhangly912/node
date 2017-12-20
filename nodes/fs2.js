var fs = require("fs");
var path = require("path");
// fs.mkdir('itbilu.js', function(err) {
//     if (err) {
//         console.log(err);
//     }
// });
// fs.writeFile('fs.js', 'Hello Node.js', (err) => {
//     if (err) throw err;
//     console.log('It\'s saved!');
// });
fs.exists("./helloDir", function(exists) {
    if (!exists) {
        fs.mkdir('./helloDir', 0777, function(err) {
            if (err) throw err;
            fs.writeFile('./helloDir/message.txt', 'Hello Node', function(err) {
                if (err) throw err;
                console.log('文件写入成功');
            });
        });
    }
});


//这三个方法是建立目录、写入文件、读取文件的同步版本。
fs.exists('./helloDirSync', function(exists) {
    if (!exists) {
        fs.mkdirSync('./helloDirSync', 0777);
    }
    fs.writeFileSync('./helloDirSync/message.txt', 'Hello Node');
    var data = fs.readFileSync('./helloDirSync/message.txt', 'UTF-8');
    console.log('file created with contents:');
    console.log(data);
});
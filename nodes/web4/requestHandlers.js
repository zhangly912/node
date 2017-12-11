var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var util = require('util');
var queryString = require("querystring");



function start(response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end('<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>');
}

function upload(response, request) {
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("输出文件")
        console.log(files);
        //将图片存储到该目录下面
        fs.renameSync(files.upload.path, "./tmp/zz.jpg");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    //重该目录下面读取图片
    fs.readFile("./tmp/zz.jpg", "binary", function(error, file) {
        //读取本地的图片
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
var fs = require('fs');　
//删除某个文件　
fs.unlink('./myModule.js', function(err) {
  　if (err) throw err;　　　　
    console.log('successfully deleted myModule.js');　　 

});
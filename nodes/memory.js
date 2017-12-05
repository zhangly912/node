var showMen = function(){
  var mem = process.memoryUsage();
  console.log(mem)
  var format = function(bytes){
    return (bytes/1024/1024).toFixed(2)+'MB';
  }
  console.log('process:heapTotal：'+format(mem.heapTotal)+'，headUsed：'+format(mem.heapUsed)+'，rss：'+format(mem.rss))
}
showMen();

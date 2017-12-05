var EventProxy = require("eventProxy");
var ep = new EventProxy();
ep.on("event1",function (info) {
  console.log(info)
})
ep.emit("event1",2);

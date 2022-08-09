const http = require("http");
const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.write("hello");
    res.end();
  }, 3000);
  window.location.url = "xx";
});
console.log("child created");
server.listen(3000);

process.on("message", (str) => {
  if (str === "ping") {
    console.log("child:收到ping");
    process.send("pong");
  }
});

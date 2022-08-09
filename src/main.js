const cluster = require("cluster");
if (cluster.isMaster) {
  newChild();

  cluster.on("exit", () => {
    console.log("一个子进程退出了");
    cluster.fork();
  });
} else {
  require("./child.js");
  process.addListener("uncaughtException", (err) => {
    console.log("捕获全局错误，子进程退出");
    process.exit(1);
  });
}

function newChild() {
  const worker = cluster.fork();

  let count = 0;

  worker.on("message", (str) => {
    if (str === "pong") {
      console.log("master:收到pong");
      count--;
    }
  });

  const timmer = setInterval(() => {
    worker.send("ping");
    count++;
    if (count > 3) {
      process.kill(worker.process.pid);
      clearInterval(timmer);
    }
  }, 500);
}
console.log("test-web2-002");
console.log("test-web2-003");
console.log("test-web2-004");
console.log("test-web2-005");
console.log("test-web2-006");

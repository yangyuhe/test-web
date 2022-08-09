const cp = require("child_process");

const childp = cp.fork(__dirname + "/child.js");
childp.send({ type: "msg", content: "hello" });

childp.on("message", (data) => {
  console.log("master:", data);
});

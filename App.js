
const express = require("express");
const WebSocketServer = require('ws');

// const execSync = require("child_process").execSync;

const app = express();

app.get("/execute", (req, res) => {
  console.log("success");
  res.send('some res sent')
//   const output = execSync("dir", { encoding: "utf-8" })
//   console.log("Output was:\n", output)
//   res.send('hii');
});

app.listen(3000, () => {
  console.log("App Started at Port 3000");
})

 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })
 
// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
 
    // sending message to client
    // ws.send('Welcome, you are connected!');
    let i = 0
    let interval = null
    //on message from client
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        interval = setInterval(() => {
            console.log('hi printed')
            ws.send(Math.random().toFixed(2).split('.')[1])
            i++
        }, 1000);
    });

    ws.onclose = (()=>{
        clearInterval(interval)
    })
})


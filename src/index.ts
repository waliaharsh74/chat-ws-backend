import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
    ws.on('error', (e) => {
        console.log(e);
    })
    ws.on('message', (data) => {
        console.log("Data received", data.toString());
    })
    ws.send('something');
})

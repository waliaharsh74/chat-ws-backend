import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
type request = {
    type: String,
    payload: {
        msg: String
        roomId: String
    }
}
type Message = {
    room: String,
    socket: WebSocket
}


const userMap = new Map<WebSocket, String>()


wss.on('connection', (ws) => {

    ws.on('error', (e) => {
        console.log(e);
    })
    ws.on('message', (msg: string) => {
        const parsedData = JSON.parse(msg);
        if (parsedData.type === 'Join') {
            userMap.set(ws, parsedData?.payload?.roomId)
        }
        if (parsedData.type === 'chat') {
            const roomId = parsedData?.payload?.roomId
            for (let [s, id] of userMap) {
                if (s !== ws && id === roomId) {
                    ws.send(parsedData?.payload?.message)
                }
            }

        }
    })
    ws.send('something');
})

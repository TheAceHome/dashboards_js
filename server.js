const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
const enc = new TextDecoder("utf-8");

server.on('connection',ws => {
    ws.on('message', message =>{
       server.clients.forEach(client=>{
            if (client.readyState === WebSocket.OPEN){
                setInterval(() => {
                    const elementNum = Math.random();
                    client.send(elementNum);
                }, 10000);
                client.send(enc.decode(message));
            }
       });
    });
    ws.send("Добро пожаловать");

});


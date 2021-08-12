// const ws = require('ws');
//
// const {Server} = ws;
// const uuid = require('uuid');
// const fs = require('fs');
// const clients = {};
// const log = fs.existsSync('log') && fs.readFileSync('log', 'utf-8');
// const messages = log ? JSON.parse(log) : [];
// const wss = new Server({port: 8000});
//
//
// wss.on("connection", (ws) => {
//     const id = uuid.v4();
//     clients[id] = ws;
//     console.log(`New client ${id}`);
//     ws.send(JSON.stringify(messages));
//
//
//     ws.on('message', (rawMessage) => {
//         const {name, message} = JSON.parse(rawMessage);
//         messages.push({name, message});
//         for (const id in clients) {
//             clients[id].send(JSON.stringify([{name, message}]))
//         }
//     })
//
//     ws.on('close', () => {
//         delete clients[id];
//         console.log(`Client is closed ${id}`)
//     })
// })
//
// process.on('SIGINT', () => {
//     wss.close();
//     fs.writeFile('log', JSON.stringify(messages), err => {
//         if (err) {
//             console.log(err);
//         }
//         process.exit();
//     })
// })

const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
const enc = new TextDecoder("utf-8");
const uuid = require('uuid');

const clients={};

server.on('connection',ws => {

    const id=uuid.v4();
    clients[id]=ws;

    ws.on('message', message =>{
       server.clients.forEach(client=>{
            if (client.readyState === WebSocket.OPEN){

                //random numbers
                setInterval(() => {
                    const elementNum = Math.random();
                    client.send(elementNum);
                }, 10000);

                //send messeges
                client.send(enc.decode(message));
            }
       });
    });
    ws.send("Добро пожаловать");
    ws.on('close', () => {
        delete clients[id];
        console.log(`Client is closed ${id}`)
    })

});
const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
const enc = new TextDecoder("utf-8");
const uuid = require('uuid');

const clients={};


server.on('connection',ws => {

    ws.on('pong', function heartbeat() {
        this.isAlive = true;
        console.log('Pong from store: ' + this.store_id);
    });

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


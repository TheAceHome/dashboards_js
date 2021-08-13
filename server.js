const WebSocket = require('ws');
const server = new WebSocket.Server({port: 3000});
const enc = new TextDecoder("utf-8");
const uuid = require('uuid');

const clients={};
const cli_name={};
server.on('connection',ws => {

    const id=uuid.v4();
    clients[id]=ws;
    cli_name[id]=ws;
    ws.on('message', message =>{
        message=enc.decode(message)
        if(cli_name[id]===ws){

           var values = Object.values(cli_name);

           if (values.includes(message)){
               clients[id].send('Такое уже существует. Попробуйте еще раз')
                                        }
           else {
               cli_name[id]=message
                }            }

        else {
            const cli=cli_name[id]
            for (const id in clients) {

            clients[id].send(''+cli+": "+message)
                                      }
             }

       });

    ws.send("Добро пожаловать");
    ws.send("Введите имя");
    ws.on('close', () => {
        delete clients[id];
        ws.send(cli_name[id]+"покинул чат")
        console.log(`Client is closed ${id}`)
    })

});
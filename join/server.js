const ws = require('ws');
const {Server} = ws;
const uuid = require('uuid');
const fs = require('fs');
const clients = {};
const cli_names ={};
const log = fs.existsSync('log') && fs.readFileSync('log', 'utf-8');
const messages = log ? JSON.parse(log) : [];
const wss = new Server({port: 8000});
const enc = new TextDecoder("utf-8");

wss.on("connection", (ws) => {
    const id = uuid.v4();
    clients[id] = ws;
    cli_names[id] = ws;

    console.log(`New client ${id}`);
    ws.send(JSON.stringify(messages));


    ws.on('message', (rawMessage) => {
        const {name, message} = JSON.parse(rawMessage);
        console.log(name)
        if (cli_names[id]===ws){
            cli_names[id] = name;
            messages.push({name, message});
        }else{
            const name =cli_names[id]
            messages.push({name, message});
        }
        console.log(cli_names);
        console.log(name)
        for (const id in clients) {
            const name_ =JSON.stringify((cli_names[id]))
            console.log(name_)
            clients[id].send(JSON.stringify([{name_, message}]))
        }
    })
    ws.on('get_name', (message)=>{

    })
    ws.on('close', () => {
        delete clients[id];
        console.log(`Client is closed ${id}`)
    })
})

process.on('SIGINT', () => {
    wss.close();
    fs.writeFile('log', JSON.stringify(messages), err => {
        if (err) {
            console.log(err);
        }
        process.exit();
    })
})

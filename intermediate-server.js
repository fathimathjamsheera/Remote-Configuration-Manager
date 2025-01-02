const express = require('express');
const WebSocket = require('ws');
const net = require('net');

const app = express();
const port = 3000;
const tcpServerPort = 8080;

let tcpClient;

const wss = new WebSocket.Server({ noServer: true });

const tcpClientConnect = () => {
  tcpClient = net.createConnection({ port: tcpServerPort }, () => {
    console.log('Connected to TCP server');
  });

  tcpClient.on('data', (data) => {
    console.log('TCP server:', data.toString());
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  tcpClient.on('end', () => {
    console.log('Disconnected from TCP server');
  });

  tcpClient.on('error', (err) => {
    console.error('TCP client error:', err.message);
  });
};

tcpClientConnect();

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`HTTP server started on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log('WebSocket message:', message);
    if (tcpClient && tcpClient.writable) {
      tcpClient.write(message);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

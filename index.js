// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build')));


// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html'));
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });





// // In index.js

// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build')));

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');
//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html'));
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });











// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let deviceResponse = '';  // To store the device response
// const commands = [];  // To store commands

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build')));

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           deviceResponse = message;  // Store the device response
//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // New route to handle the command
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
  
//   // Simulate sending the command to the device and getting a response
//   // In a real implementation, you would send the command to the TCP device here
//   console.log(`Command received: ${command}`);
//   commands.push({ type: 'sent', command });  // Store the command
//   deviceResponse = 'Simulated response from device';  // Store the response

//   res.json({ success: true });
// });

// // New route to get the device response
// app.get('/get-device-response', (req, res) => {
//   res.json({ response: deviceResponse });
// });

// // New route to get the command logs
// app.get('/get-commands', (req, res) => {
//   res.json(commands);
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html'));
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });






// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let deviceResponse = '';  // To store the device response
// const commands = [];  // To store commands

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build')));

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');
//         }

//         // Check for specific command and handle it
//         if (message.startsWith('$AT+WRITE=1100')) {
//           // Send a response for this specific command
//           socket.write('OK');
//           socket.write('\r\n');
//           deviceResponse = 'Received command $AT+WRITE=1100 and responded with OK';
//           commands.push({ type: 'received', command: message });
//         }

//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(message);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//     });

//     // Store the socket to send commands later
//     app.locals.deviceSocket = socket;
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // New route to handle the command
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
  
//   // Check if the device socket is available
//   const socket = app.locals.deviceSocket;
//   if (socket && socket.writable) {
//     // Send the command to the device
//     socket.write(command + '\r\n', (err) => {
//       if (err) {
//         console.error('Failed to send command:', err);
//         res.status(500).json({ success: false, message: 'Failed to send command to device' });
//       } else {
//         console.log(`Command sent: ${command}`);
//         commands.push({ type: 'sent', command });  // Store the command
//         res.json({ success: true });
//       }
//     });
//   } else {
//     res.status(500).json({ success: false, message: 'Device not connected' });
//   }
// });

// // New route to get the device response
// app.get('/get-device-response', (req, res) => {
//   res.json({ response: deviceResponse });
// });

// // New route to get the command logs
// app.get('/get-commands', (req, res) => {
//   res.json(commands);
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html'));
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });









// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');
//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // app.post('/login', (req, res) => {
// //   const { password } = req.body;
// //   if (password === 'RDL123') {
// //     res.json({ success: true });
// //   } else {
// //     res.status(401).json({ success: false, message: 'Invalid password' });
// //   }
// // });



// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });



// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });
 













// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;
// let portOpenDateTime;  // Variable to store the port open date and time

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     console.log(`TCP server listening on port ${portToListen}`);
//     portOpenDateTime = new Date().toLocaleString();  // Set the port open date and time
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.get('/port-open-info', (req, res) => {
//   res.json({ portOpenDateTime });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');
//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // app.post('/login', (req, res) => {
// //   const { password } = req.body;
// //   if (password === 'RDL123') {
// //     res.json({ success: true });
// //   } else {
// //     res.status(401).json({ success: false, message: 'Invalid password' });
// //   }
// // });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   console.log(`HTTP server listening on port ${port}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });










// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');
//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });











// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });



// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });












// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });


















// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });













// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Print received response to the console
//         console.log(`Received response in HEX: ${responseHex}`);
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/server-front-end', 'index.html')); // Adjust the path as necessary
// });

// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });

 













// ///correct working code
// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// // Route to start the TCP server
// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     const startTime = new Date().toLocaleString();
//     console.log(`TCP server listening on port ${portToListen} at ${startTime}`);
//     res.json({ message: `Server started on port ${portToListen}` });
//   });
// });

// // Route to send a command to the connected device
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to send a read command and handle the response
// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     console.log(`Server sending command: ${command}`); // Log the command to the server console
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route for login
// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // Serve static files
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
// });

// // Create and start the HTTP server
// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });














// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;
// let portOpenDateTime = null; // Store the port open date and time

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// // Route to start the TCP server
// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     portOpenDateTime = new Date().toLocaleString();  // Store the date and time the port was opened
//     console.log(`TCP server listening on port ${portToListen} at ${portOpenDateTime}`);
//     res.json({ message: `Server started on port ${portToListen}`, dateTime: portOpenDateTime });
//   });
// });

// // Route to send a command to the connected device
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to send a read command and handle the response
// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     console.log(`Server sending command: ${command}`); // Log the command to the server console
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to handle Modbus read command
// app.post('/send-modbus-read', (req, res) => {
//   const command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
//   if (connectedSocket) {
//     console.log(`Server sending Modbus read command: ${command}`); // Log the command to the server console
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Modbus Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Modbus read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to get the port open date and time
// app.get('/port-open-info', (req, res) => {
//   if (portOpenDateTime) {
//     res.json({ dateTime: portOpenDateTime });
//   } else {
//     res.status(404).json({ message: 'TCP server is not running' });
//   }
// });

// // Route for login
// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // Serve static files, including debug.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
// });

// // Create and start the HTTP server
// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });
















//best code
// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;
// let portOpenDateTime = null; // Store the port open date and time

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// // Route to start the TCP server
// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     portOpenDateTime = new Date().toLocaleString();  // Store the date and time the port was opened
//     console.log(`TCP server listening on port ${portToListen} at ${portOpenDateTime}`);
//     res.json({ message: `Server started on port ${portToListen}`, dateTime: portOpenDateTime });
//   });
// });

// // Route to send a command to the connected device
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to send a read command and handle the response
// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     console.log(`Server sending command: ${command}`); // Log the command to the server console
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to handle Modbus read command
// app.post('/send-modbus-read', (req, res) => {
//   const command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
//   if (connectedSocket) {
//     console.log(`Server sending Modbus read command: ${command}`); // Log the command to the server console
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Modbus Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Modbus read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to get the port open date and time
// app.get('/port-open-info', (req, res) => {
//   if (portOpenDateTime) {
//     res.json({ dateTime: portOpenDateTime });
//   } else {
//     res.status(404).json({ message: 'TCP server is not running' });
//   }
// });

// // Route for login
// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // Serve static files, including debug.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
// });

// // Create and start the HTTP server
// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });













// const express = require('express');
// const net = require('net');
// const path = require('path');
// const { Server: WebSocketServer } = require('ws');

// const app = express();
// const port = 3000;

// let tcpServer;
// let wss;
// let connectedSocket;
// let portOpenDateTime = null; // Store the port open date and time

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// // Route to start the TCP server
// app.post('/start-server', (req, res) => {
//   const portToListen = req.body.port || 5152;

//   if (tcpServer && tcpServer.listening) {
//     return res.status(400).json({ message: 'Server is already running' });
//   }

//   tcpServer = net.createServer((socket) => {
//     console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

//     connectedSocket = socket;  // Store the connected socket

//     let buffer = '';
//     let message1, message2, message3, message4;

//     socket.on('data', (data) => {
//       buffer += data.toString();

//       let index;
//       while ((index = buffer.indexOf('\n')) !== -1) {
//         const message = buffer.slice(0, index).trim();
//         buffer = buffer.slice(index + 1);

//         console.log(`Received message from client: ${message}`);

//         if (!message1 && message.startsWith('RDL')) {
//           message1 = message;
//           console.log("Matching RDL");

//           console.log(`Sending command to client: #7&@)(fWOq^`);
//           socket.write('#7&@)(fWOq^');
//           socket.write('\r\n');
//         } else if (!message2 && message1) {
//           message2 = message;
//           console.log(`Sending command to client: $AT+READ=2500`);
//           socket.write('$AT+READ=2500');
//           socket.write('\r\n');
//         } else if (!message3 && message2) {
//           message3 = message;
//           console.log(`Sending command to client: $AT+READ=40`);
//           socket.write('$AT+READ=40');
//           socket.write('\r\n');
//         } else if (!message4 && message3) {
//           message4 = message;
//           console.log(`Sending command to client: $AT+READ=450`);
//           socket.write('$AT+READ=450');
//           socket.write('\r\n');

//           if (wss) {
//             wss.clients.forEach(client => {
//               if (client.readyState === client.OPEN) {
//                 client.send('END_OF_MESSAGES');
//               }
//             });
//           }
//         }

//         // Broadcast received message to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Received: ${message}`);
//             }
//           });
//         }
//       }
//     });

//     socket.on('end', () => {
//       console.log('Client disconnected');
//       console.log('Stored messages:', { message1, message2, message3, message4 });
//       connectedSocket = null;  // Clear the connected socket
//     });

//     socket.on('error', (err) => {
//       console.error(`Error: ${err.message}`);
//       connectedSocket = null;  // Clear the connected socket
//     });
//   });

//   tcpServer.on('error', (err) => {
//     console.error(`TCP server error: ${err.message}`);
//     res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
//   });

//   tcpServer.listen(portToListen, '0.0.0.0', () => {
//     portOpenDateTime = new Date().toLocaleString();  // Store the date and time the port was opened
//     console.log(`TCP server listening on port ${portToListen} at ${portOpenDateTime}`);
//     res.json({ message: `Server started on port ${portToListen}`, dateTime: portOpenDateTime });
//   });
// });

// // Route to send a command to the connected device
// app.post('/send-command', (req, res) => {
//   const { command } = req.body;
//   if (connectedSocket) {
//     console.log(`Sending command to client: ${command}`); // Log the command being sent
//     connectedSocket.write(command + '\r\n');

//     // Broadcast the command to WebSocket clients
//     if (wss) {
//       wss.clients.forEach(client => {
//         if (client.readyState === client.OPEN) {
//           client.send(`Command sent: ${command}`);
//         }
//       });
//     }

//     res.json({ message: 'Command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to send a read command and handle the response
// app.post('/send-read-command', (req, res) => {
//   const command = '$AT+READ=1100';
//   if (connectedSocket) {
//     console.log(`Sending read command to client: ${command}`); // Log the read command being sent
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to handle Modbus read command
// app.post('/send-modbus-read', (req, res) => {
//   const command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
//   if (connectedSocket) {
//     console.log(`Sending Modbus read command to client: ${command}`); // Log the Modbus command being sent
//     connectedSocket.write(command + '\r\n');

//     let responseBuffer = '';
//     connectedSocket.on('data', (data) => {
//       responseBuffer += data.toString();

//       if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
//         const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
//         // Broadcast the response in hex format to WebSocket clients
//         if (wss) {
//           wss.clients.forEach(client => {
//             if (client.readyState === client.OPEN) {
//               client.send(`Modbus Response in HEX: ${responseHex}`);
//             }
//           });
//         }
        
//         responseBuffer = '';  // Clear the buffer after processing
//       }
//     });

//     res.json({ message: 'Modbus read command sent' });
//   } else {
//     res.status(400).json({ message: 'No connected device' });
//   }
// });

// // Route to get the port open date and time
// app.get('/port-open-info', (req, res) => {
//   if (portOpenDateTime) {
//     res.json({ dateTime: portOpenDateTime });
//   } else {
//     res.status(404).json({ message: 'TCP server is not running' });
//   }
// });

// // Route for login
// app.post('/login', (req, res) => {
//   const { password } = req.body;
//   if (password === 'RDL123') {
//     res.json({ success: true, redirectTo: '/sidebar.html' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid password' });
//   }
// });

// // Serve static files, including debug.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
// });

// // Create and start the HTTP server
// const httpServer = app.listen(port, () => {
//   const startTime = new Date().toLocaleString();
//   console.log(`HTTP server listening on port ${port} at ${startTime}`);
//   wss = new WebSocketServer({ server: httpServer });
//   console.log(`WebSocket server listening on port ${port}`);
// });
















const express = require('express');
const net = require('net');
const path = require('path');
const { Server: WebSocketServer } = require('ws');

const app = express();
const port = 3000;

let tcpServer;
let wss;
let connectedSocket;
let portOpenDateTime = null; // Store the port open date and time

app.use(express.json());
app.use(express.static(path.join(__dirname, 'server-front-end/build'))); // Adjust the path as necessary

// Route to start the TCP server
app.post('/start-server', (req, res) => {
  const portToListen = req.body.port || 5152;

  if (tcpServer && tcpServer.listening) {
    return res.status(400).json({ message: 'Server is already running' });
  }

  tcpServer = net.createServer((socket) => {
    console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

    connectedSocket = socket;  // Store the connected socket

    let buffer = '';
    let message1, message2, message3, message4;

    socket.on('data', (data) => {
      buffer += data.toString();

      let index;
      while ((index = buffer.indexOf('\n')) !== -1) {
        const message = buffer.slice(0, index).trim();
        buffer = buffer.slice(index + 1);

        console.log(`Received message from client: ${message}`);

        if (!message1 && message.startsWith('RDL')) {
          message1 = message;
          console.log("Matching RDL");

          console.log(`#7&@)(fWOq^`);
          socket.write('#7&@)(fWOq^');
          socket.write('\r\n');
        } else if (!message2 && message1) {
          message2 = message;
          console.log(`$AT+READ=2500`);
          socket.write('$AT+READ=2500');
          socket.write('\r\n');
        } else if (!message3 && message2) {
          message3 = message;
          console.log(`$AT+READ=40`);
          socket.write('$AT+READ=40');
          socket.write('\r\n');
        } else if (!message4 && message3) {
          message4 = message;
          console.log(`$AT+READ=450`);
          socket.write('$AT+READ=450');
          socket.write('\r\n');

          if (wss) {
            wss.clients.forEach(client => {
              if (client.readyState === client.OPEN) {
                client.send('END_OF_MESSAGES');
              }
            });
          }
        }

        // Broadcast received message to WebSocket clients
        if (wss) {
          wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
              client.send(`Received: ${message}`);
            }
          });
        }
      }
    });

    socket.on('end', () => {
      console.log('Client disconnected');
      console.log('Stored messages:', { message1, message2, message3, message4 });
      connectedSocket = null;  // Clear the connected socket
    });

    socket.on('error', (err) => {
      console.error(`Error: ${err.message}`);
      connectedSocket = null;  // Clear the connected socket
    });
  });

  tcpServer.on('error', (err) => {
    console.error(`TCP server error: ${err.message}`);
    res.status(500).json({ message: `Error starting TCP server: ${err.message}` });
  });

  tcpServer.listen(portToListen, '0.0.0.0', () => {
    portOpenDateTime = new Date().toLocaleString();  // Store the date and time the port was opened
    console.log(`TCP server listening on port ${portToListen} at ${portOpenDateTime}`);
    res.json({ message: `Server started on port ${portToListen}`, dateTime: portOpenDateTime });
  });
});

// Route to send a command to the connected device
app.post('/send-command', (req, res) => {
  const { command } = req.body;
  if (connectedSocket) {
    console.log(`${command}`); // Log only the command being sent
    connectedSocket.write(command + '\r\n');

    // Broadcast the command to WebSocket clients
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(`Command sent: ${command}`);
        }
      });
    }

    res.json({ message: 'Command sent' });
  } else {
    res.status(400).json({ message: 'No connected device' });
  }
});

// Route to send a read command and handle the response
app.post('/send-read-command', (req, res) => {
  const command = '$AT+READ=1100';
  if (connectedSocket) {
    console.log(`${command}`); // Log only the command being sent
    connectedSocket.write(command + '\r\n');

    let responseBuffer = '';
    connectedSocket.on('data', (data) => {
      responseBuffer += data.toString();

      if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
        const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
        // Broadcast the response in hex format to WebSocket clients
        if (wss) {
          wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
              client.send(`Response in HEX: ${responseHex}`);
            }
          });
        }
        
        responseBuffer = '';  // Clear the buffer after processing
      }
    });

    res.json({ message: 'Read command sent' });
  } else {
    res.status(400).json({ message: 'No connected device' });
  }
});

// Route to handle Modbus read command
app.post('/send-modbus-read', (req, res) => {
  const command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
  if (connectedSocket) {
    console.log(`${command}`); // Log only the command
    connectedSocket.write(command + '\r\n');

    let responseBuffer = '';
    connectedSocket.on('data', (data) => {
      responseBuffer += data.toString();

      if (responseBuffer.includes('\n')) {  // Assuming the response ends with a newline character
        const responseHex = Buffer.from(responseBuffer.trim()).toString('hex');
        
        // Broadcast the response in hex format to WebSocket clients
        if (wss) {
          wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
              client.send(`Modbus Response in HEX: ${responseHex}`);
            }
          });
        }
        
        responseBuffer = '';  // Clear the buffer after processing
      }
    });

    res.json({ message: 'Modbus read command sent' });
  } else {
    res.status(400).json({ message: 'No connected device' });
  }
});

// Route to get the port open date and time
app.get('/port-open-info', (req, res) => {
  if (portOpenDateTime) {
    res.json({ dateTime: portOpenDateTime });
  } else {
    res.status(404).json({ message: 'TCP server is not running' });
  }
});

// Route for login
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'RDL123') {
    res.json({ success: true, redirectTo: '/sidebar.html' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Serve static files, including debug.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'server-front-end/build', 'index.html')); // Adjust the path as necessary
});

// Create and start the HTTP server
const httpServer = app.listen(port, () => {
  const startTime = new Date().toLocaleString();
  console.log(`HTTP server listening on port ${port} at ${startTime}`);
  wss = new WebSocketServer({ server: httpServer });
  console.log(`WebSocket server listening on port ${port}`);
});

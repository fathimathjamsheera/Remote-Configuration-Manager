// document.addEventListener('DOMContentLoaded', (event) => {
//   const commandOutput = document.getElementById('commandOutput');
//   const socket = new WebSocket('ws://localhost:3000');

//   socket.addEventListener('open', function (event) {
//     console.log('WebSocket connection established');
//   });

//   socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);

//     // Display the command
//     const messageElement = document.createElement('div');
//     messageElement.textContent = event.data;
//     commandOutput.appendChild(messageElement);
//   });

//   socket.addEventListener('error', function (event) {
//     console.error('WebSocket error: ', event);
//   });

//   socket.addEventListener('close', function (event) {
//     console.log('WebSocket connection closed');
//   });
// });
 






// debug.js
document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/date-time') // Adjust the URL based on your API endpoint
      .then(response => response.json())
      .then(data => {
          document.getElementById('date-time').innerText = `Date: ${data.date}, Time: ${data.time}`;
      })
      .catch(error => console.error('Error fetching date and time:', error));
});

  
  
  
  
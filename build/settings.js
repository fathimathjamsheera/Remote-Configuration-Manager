// function sendReadCommand() {
//   const command = '$AT+WRITE=1100=02 01 01 01 0D 0A';

//   fetch('/send-command', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ command }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Command sent:', data.message);
//   })
//   .catch((error) => {
//     console.error('Error sending command:', error);
//   });
// }

// document.getElementById('readButton').addEventListener('click', sendReadCommand);











// function sendReadCommand() {
//   let command;

//   // Determine which checkbox is checked and set the corresponding command
//   if (document.querySelector('input[name="modbus"]').checked) {
//     command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
//   } else if (document.querySelector('input[name="analog"]').checked) {
//     command = '$AT+WRITE=1100=01 02 01 01 0D 0A';
//   } else if (document.querySelector('input[name="digitalInput"]').checked) {
//     command = '$AT+WRITE=1100=01 01 02 01 0D 0A';
//   } else if (document.querySelector('input[name="modbusTcp"]').checked) {
//     command = '$AT+WRITE=1100=01 01 01 02 0D 0A';
//   } else {
//     console.error('No option selected');
//     return; // Exit if no option is selected
//   }

//   // Send the command to the server
//   fetch('/send-command', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ command }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Command sent:', data.message);
//   })
//   .catch((error) => {
//     console.error('Error sending command:', error);
//   });
// }

// // Add event listener to the button
// document.getElementById('readButton').addEventListener('click', sendReadCommand);







//best code
// function sendWriteCommand() {
//   let command;

//   // Determine which checkbox is checked and set the corresponding command
//   if (document.querySelector('input[name="modbus"]').checked) {
//     command = '$AT+WRITE=1100=02 01 01 01 0D 0A';
//   } else if (document.querySelector('input[name="analog"]').checked) {
//     command = '$AT+WRITE=1100=01 02 01 01 0D 0A';
//   } else if (document.querySelector('input[name="digitalInput"]').checked) {
//     command = '$AT+WRITE=1100=01 01 02 01 0D 0A';
//   } else if (document.querySelector('input[name="modbusTcp"]').checked) {
//     command = '$AT+WRITE=1100=01 01 01 02 0D 0A';
//   } else {
//     console.error('No option selected');
//     return; // Exit if no option is selected
//   }

//   // Send the write command to the server
//   fetch('/send-command', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ command }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Command sent:', data.message);
//   })
//   .catch((error) => {
//     console.error('Error sending command:', error);
//   });
// }

// function sendReadCommand() {
//   // Send the read command to the server
//   fetch('/send-read-command', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Read command response:', data.message);

//     // Display the read result in the dedicated div
//     document.getElementById('readResults').innerText = `Read Data: ${data.message}`;

//     // Automatically check the corresponding checkbox based on the read response
//     if (data.message.includes('02 01 01 01')) {
//       document.querySelector('input[name="modbus"]').checked = true;
//     } else if (data.message.includes('01 02 01 01')) {
//       document.querySelector('input[name="analog"]').checked = true;
//     } else if (data.message.includes('01 01 02 01')) {
//       document.querySelector('input[name="digitalInput"]').checked = true;
//     } else if (data.message.includes('01 01 01 02')) {
//       document.querySelector('input[name="modbusTcp"]').checked = true;
//     }
//   })
//   .catch((error) => {
//     console.error('Error reading data:', error);
//   });
// }

// // Add event listeners to the buttons
// document.getElementById('writeButton').addEventListener('click', sendWriteCommand);
// document.getElementById('readButton').addEventListener('click', sendReadCommand);








function sendWriteCommand() {
  // Initialize variables for each checkbox
  let modbus = document.querySelector('input[name="modbus"]').checked ? '02' : '01';
  let analog = document.querySelector('input[name="analog"]').checked ? '02' : '01';
  let digitalInput = document.querySelector('input[name="digitalInput"]').checked ? '02' : '01';
  let modbusTcp = document.querySelector('input[name="modbusTcp"]').checked ? '02' : '01';

  // Construct the command string based on the selected options
  let command = `$AT+WRITE=1100=${modbus} ${analog} ${digitalInput} ${modbusTcp} 0D 0A`;

  // Send the write command to the server
  fetch('/send-command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Command sent:', data.message);
  })
  .catch((error) => {
    console.error('Error sending command:', error);
  });
}

function sendReadCommand() {
  // Send the read command to the server
  fetch('/send-read-command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Read command response:', data.message);

    // Display the read result in the dedicated div
    document.getElementById('readResults').innerText = `Read Data: ${data.message}`;

    // Automatically check the corresponding checkbox based on the read response
    if (data.message.includes('02 01 01 01')) {
      document.querySelector('input[name="modbus"]').checked = true;
    } else if (data.message.includes('01 02 01 01')) {
      document.querySelector('input[name="analog"]').checked = true;
    } else if (data.message.includes('01 01 02 01')) {
      document.querySelector('input[name="digitalInput"]').checked = true;
    } else if (data.message.includes('01 01 01 02')) {
      document.querySelector('input[name="modbusTcp"]').checked = true;
    }
  })
  .catch((error) => {
    console.error('Error reading data:', error);
  });
}

// Add event listeners to the buttons
document.getElementById('writeButton').addEventListener('click', sendWriteCommand);
document.getElementById('readButton').addEventListener('click', sendReadCommand);

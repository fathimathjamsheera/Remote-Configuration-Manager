document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('readButton').addEventListener('click', function() {
      const command = '$AT+READ=1100';
  
      fetch('/send-read-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Server sending command: ${command}`);
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  
function sendReadCommand() {
  // Implement the logic to send the read command
  console.log('Read command sent');
}

function updateInterval(unit) {
  const intervalUnitSpan = document.getElementById('interval-unit');
  if (unit === 'sec') {
    intervalUnitSpan.textContent = '(sec)';
  } else if (unit === 'min') {
    intervalUnitSpan.textContent = '(min)';
  } else if (unit === 'hour') {
    intervalUnitSpan.textContent = '(hour)';
  }
}

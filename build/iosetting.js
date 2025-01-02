// document.addEventListener('DOMContentLoaded', function () {
//     // Fetch and include the sidebar
//     fetch('sidebar.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('sidebar-container').innerHTML = data;
//         });

//     // Script for tab functionality
//     const tabs = document.querySelectorAll('.tabs li a');
//     const tabContents = document.querySelectorAll('.tab-content');

//     tabs.forEach(tab => {
//         tab.addEventListener('click', (event) => {
//             event.preventDefault();
//             const target = document.querySelector(tab.getAttribute('href'));
//             tabContents.forEach(tc => tc.style.display = 'none');
//             target.style.display = 'block';
//         });
//     });

//     // Send command when Read button is clicked
//     document.getElementById('readButton').addEventListener('click', function () {
//         const command = '$AT+WRITE=1100';
//         fetch('/send-command', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ command })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 alert('Command sent successfully');
//             } else {
//                 alert('Failed to send command');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });
// });




document.addEventListener('DOMContentLoaded', function () {
    // Fetch and include the sidebar
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        });

    // Script for tab functionality
    const tabs = document.querySelectorAll('.tabs li a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(tab.getAttribute('href'));
            tabContents.forEach(tc => tc.style.display = 'none');
            target.style.display = 'block';
        });
    });

    // // Send command when Read button is clicked
    // document.getElementById('readButton').addEventListener('click', function () {
    //     const command = '$AT+WRITE=1100';
    //     fetch('/send-command', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ command })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             alert('Command sent successfully');
    //         } else {
    //             alert('Failed to send command');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }); 
});
 
const massFlowRateElement = document.getElementById('massFlowRate');
const pressureElement = document.getElementById('pressureReading');
const temperatureElement = document.getElementById('temperatureReading');

const cloudsElement = document.querySelector('.clouds');


// Function to update cloud speed dynamically
function updateCloudSpeed(flowRate) {
    const animationSpeed = Math.max(10, 100 - flowRate); // Faster flow rate = slower animation speed
    cloudsElement.style.animationDuration = `${animationSpeed}s`;
}

// Simulate live data updates and update cloud speed
function updateFlowRate() {
    const randomFlowRate = (Math.random() * 100).toFixed(2); // Generate a random flow rate
    massFlowRateElement.textContent = randomFlowRate;

    // Update cloud animation speed
    //updateCloudSpeed(randomFlowRate);
}

// Update the flow rate every second
//setInterval(updateFlowRate, 30000);

const connectionStatusElement = document.getElementById('connectionStatus');
const statusTextElement = document.getElementById('statusText');
let url = 'ws://192.168.4.1:81/ws/socket-server/';
let socket = new WebSocket(url);

// const socket = new WebSocket('ws://' + window.location.host + '/ws/somepath/');


socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    // document.getElementById("massFlowRate").innerText = event.data;
    convertData(parseFloat(data.flow));
    pressureElement.innerText = data.pressure;
    temperatureElement.innerText = data.temperature;
};

socket.onopen = function() {
    console.log("WebSocket connected!");
    statusTextElement.textContent = 'Connected';
    connectionStatusElement.style.backgroundColor = 'rgba(41, 221, 26 , 0.78)';
    
    // Remove the connection status after 5 seconds
    setTimeout(() => {
        statusTextElement.textContent = '';
        connectionStatusElement.style.backgroundColor = '';
    }, 5000);
};

socket.onclose = function() {
    console.log("WebSocket disconnected!");
    statusTextElement.textContent = 'Disconnected';
    connectionStatusElement.style.backgroundColor = 'rgba(243, 50, 16, 0.83)';
}

function convertData(reading){
    const unit = document.getElementById('unitSelector').value;

    const readingElement = document.getElementById('massFlowRate');

    switch (unit) {
        case 'Kg/s':
            reading = reading; // Assuming the base reading is in Kg/s
            break;
        case 'Kg/min':
            reading = reading * 60; 
            break;
        case 'Kg/h':
            reading = reading * 60 * 60; 
            break;
        case 'lb/s':
            reading = reading * 2.20462; 
            break;
        case 'lb/min':
            reading = reading * 2.20462 * 60; 
            break;
        case 'lb/h':
            reading = reading * 2.20462 * 60 * 60; 
            break;
    }

    document.getElementById("massFlowRate").textContent = reading.toFixed(2);
}



document.getElementById('unitSelector').addEventListener('change', function() {
    const unit = this.value;
    const readingElement = document.getElementById('massFlowRate');
    switch (unit) {
        case 'Kg/s':
            reading = reading; // Assuming the base reading is in Kg/s
            break;
        case 'Kg/min':
            reading = reading * 60; 
            break;
        case 'Kg/h':
            reading = reading * 60 * 60; 
            break;
        case 'lb/s':
            reading = reading * 2.20462; 
            break;
        case 'lb/min':
            reading = reading * 2.20462 * 60; 
            break;
        case 'lb/h':
            reading = reading * 2.20462 * 60 * 60; 
            break;
    }
  
    document.getElementById("massFlowRate").textContent = reading.toFixed(2);

});




// WebSocket connection setup
// let url = 'ws://192.168.4.1:81/';
// let socket = new WebSocket(url);

// socket.onmessage = function(event) {
//     convertData(parseFloat(event.data));
// };

// socket.onopen = function() {
//     console.log("WebSocket connected!");
//     statusTextElement.textContent = 'Connected';
//     statusTextElement.style.color = 'green';
// };

// socket.onclose = function() {
//     console.log("WebSocket disconnected!");
//     statusTextElement.textContent = 'Disconnected';
//     statusTextElement.style.color = 'red';
// };

// socket.onerror = function(error) {
//     console.error('WebSocket Error:', error);
//     statusTextElement.textContent = 'Error';
//     statusTextElement.style.color = 'orange';
// };

// // Reconnect logic
// setInterval(() => {
//     if (socket.readyState === WebSocket.CLOSED) {
//         statusTextElement.textContent = 'Reconnecting...';
//         statusTextElement.style.color = 'yellow';
//         socket = new WebSocket(url);
//     }
// }, 5000);

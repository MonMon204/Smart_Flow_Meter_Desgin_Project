const massFlowRateElement = document.getElementById('massFlowRate');
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


let url = 'ws://192.168.4.1/ws/socket-server/';
let socket = new WebSocket(url);

socket.onmessage = function(event) {
    // let data = JSON.parse(event.data);
    // document.getElementById("massFlowRate").innerText = event.data;
    convertData(parseFloat(event.data));
};

socket.onopen = function() {
    console.log("WebSocket connected!");
};

socket.onclose = function() {
    console.log("WebSocket disconnected!");
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

    document.getElementById("massFlowRate").textContent = reading.toFixed(10);
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
  
    document.getElementById("massFlowRate").textContent = reading.toFixed(10);

});


const statusTextElement = document.getElementById('statusText');

// WebSocket connection setup
// const websocket = new WebSocket('ws://your-esp32-websocket-address');

// Event: Connection opened
socket.addEventListener('open', () => {
    statusTextElement.textContent = 'Connected';
    statusTextElement.style.color = 'green';
});

// Event: Connection closed
socket.addEventListener('close', () => {
    statusTextElement.textContent = 'Disconnected';
    statusTextElement.style.color = 'red';
});

// Event: Connection error
socket.addEventListener('error', () => {
    statusTextElement.textContent = 'Error';
    statusTextElement.style.color = 'orange';
});

// Optional: Reconnect logic
setInterval(() => {
    if (socket.readyState === WebSocket.CLOSED) {
        statusTextElement.textContent = 'Reconnecting...';
        statusTextElement.style.color = 'yellow';
        socket = new WebSocket(url);
    }
}, 5000);


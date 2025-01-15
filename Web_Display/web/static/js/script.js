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


let url = 'ws://192.168.1.3/ws/socket-server/';
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
    document.getElementById('unitSelector').addEventListener('change', function() {
        const unit = this.value;
        const readingElement = document.getElementById('massFlowRate');

        switch (unit) {
            case 'L/min':
                reading = reading; // Assuming the base reading is in L/min
                break;
            case 'm³/h':
                reading = reading / 1000 * 60; // Convert L/min to m³/h
                break;
            case 'gpm':
                reading = reading / 3.785; // Convert L/min to gpm
                break;
        }
        
        document.getElementById("massFlowRate").textContent = reading.toFixed(3);
        // readingElement.innerText = reading.toFixed(3);
    });
}
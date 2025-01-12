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

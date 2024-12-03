const massFlowRateElement = document.getElementById('massFlowRate');

// Simulating live data updates
function updateFlowRate() {
    const randomFlowRate = (Math.random() * 100).toFixed(2); // Generate a random flow rate
    massFlowRateElement.textContent = randomFlowRate;
}

// Update the flow rate every second
setInterval(updateFlowRate, 1000);

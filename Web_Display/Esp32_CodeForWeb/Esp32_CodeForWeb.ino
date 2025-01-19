#include <WiFi.h>
#include <WebSocketsServer.h>

// Constants
const char* ssid = "MonMon's_ESP32_Access_Point"; // Replace with your desired AP name
const char* password = "12345678";       // Replace with your desired password (minimum 8 characters)

// Globals
WebSocketsServer webSocket = WebSocketsServer(80);

// Called when receiving any WebSocket message
void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  // Handle WebSocket events
  switch(type) {
    // Client has disconnected
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;

    // New client has connected
    case WStype_CONNECTED: {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connection from ", num);
        Serial.println(ip.toString());
        // Send a welcome message to the client
        webSocket.sendTXT(num, "Connected to flow meter server!");
      }
      break;

    // Text message received (ignoring in this case)
    case WStype_TEXT:
      Serial.printf("[%u] Text: %s\n", num, payload);
      break;

    // For other cases, do nothing
    default:
      break;
  }
}

void setup() {
  // Start Serial port
  Serial.begin(115200);

  // Configure the ESP32 as an access point
  Serial.println("Setting up Access Point...");
  WiFi.softAP(ssid, password);

  // Print the IP address of the access point
  IPAddress IP = WiFi.softAPIP();
  Serial.println("Access Point created!");
  Serial.print("IP address: ");
  Serial.println(IP);

  // Start WebSocket server and assign callback
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);
}

void loop() {
  // Handle WebSocket connections
  webSocket.loop();

  // Generate random flow meter data (for testing)
  //float randomFlow = random(10, 100) + random(0, 100) / 100.0; // Random float between 10.00 and 99.99

  // Convert the flow data to a string
  String flowData = "50.00";

  // Broadcast the flow data to all connected clients
  webSocket.broadcastTXT(flowData);

  // Print to Serial Monitor for debugging
  Serial.println("Flow: " + flowData + " L/min");

  // Delay before sending the next value
  delay(1000);
}

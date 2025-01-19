#include <WiFi.h>
#include <WebSocketsServer.h>
#include <WebServer.h>

// Constants
const char* ssid = "MonMon's_ESP32_Access_Point"; // Replace with your desired AP name
const char* password = "12345678";       // Replace with your desired password (minimum 8 characters)
const char* redirect_url = "http://192.168.4.2"; // Replace with the Django server address

// Globals
WebSocketsServer webSocket = WebSocketsServer(81); // Use port 81 for WebSocket server
WebServer server(80); // HTTP server on port 80

// Called when receiving any WebSocket message
void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;

    case WStype_CONNECTED: {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connection from ", num);
        Serial.println(ip.toString());
        webSocket.sendTXT(num, "Connected to flow meter server!");
      }
      break;

    case WStype_TEXT:
      Serial.printf("[%u] Text: %s\n", num, payload);
      break;

    default:
      break;
  }
}

// HTTP handler to redirect users to the Django server
void handleRoot() {
  server.sendHeader("Location", redirect_url, true); // HTTP redirect
  server.send(302, "text/plain", ""); // Send a blank response
}

void setup() {
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

  // Configure HTTP server to handle redirects
  server.on("/", handleRoot); // Redirect on root path
  server.begin();
  Serial.println("Web Server Started");
}

void loop() {
  // Handle WebSocket connections
  webSocket.loop();

  // Handle HTTP requests
  server.handleClient();

  // Broadcast flow meter data to all connected WebSocket clients
  String flowData = "50.00"; // Replace with real flow meter data
  webSocket.broadcastTXT(flowData);

  // Print to Serial Monitor for debugging
  Serial.println("Flow: " + flowData + " L/min");

  // Delay before sending the next value
  delay(1000);
}

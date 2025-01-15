import json
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer

class WebSocketConsumer(WebsocketConsumer):
    def connect(self):
        # Accept the WebSocket connection
        #await self.accept()
        self.accept()

        self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'Connected to the server'
        }))

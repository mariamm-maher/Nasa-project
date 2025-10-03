from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake AI model streaming generator (replace with real model)
async def fake_model_stream(user_message: str):
    tokens = [
        f"🤖 Received: {user_message}\n",
        "Thinking...\n",
        "This is a simulated streaming response.\n",
        "You can replace this with your real model.\n",
    ]
    for token in tokens:
        await asyncio.sleep(0.5) 
        yield token

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            user_message = await websocket.receive_text()
            async for token in fake_model_stream(user_message):
                await websocket.send_text(token)
            await websocket.send_text("[DONE]")
    except WebSocketDisconnect:
        print("🔌 Client disconnected")

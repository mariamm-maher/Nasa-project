from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import pandas as pd
from typing import Optional
import os

# Load CSV file when server starts
CSV_FILE_PATH = "SB_publication_PMC.csv"
publications_df = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global publications_df
    try:
        if os.path.exists(CSV_FILE_PATH):
            publications_df = pd.read_csv(CSV_FILE_PATH)
            print(f"✅ Loaded {len(publications_df)} publications from CSV")
        else:
            print(f"❌ CSV file not found: {CSV_FILE_PATH}")
            publications_df = pd.DataFrame()  # Empty DataFrame as fallback
    except Exception as e:
        print(f"❌ Error loading CSV: {e}")
        publications_df = pd.DataFrame()  # Empty DataFrame as fallback
    
    yield
    
    # Shutdown
    print("🔄 Shutting down...")

app = FastAPI(lifespan=lifespan)

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

# GET endpoint to return all publications
@app.get("/publications")
async def get_all_publications():
    """Get all publications from the CSV file"""
    if publications_df is not None and not publications_df.empty:
        return publications_df.to_dict(orient="records")
    return {"message": "No publications available", "data": []}

# GET endpoint to search publications by title
@app.get("/publications/search")
async def search_publications(q: str = Query(..., description="Search query for publication titles")):
    """Search publications by title (case-insensitive)"""
    if publications_df is not None and not publications_df.empty:
        # Case-insensitive search in the title column
        mask = publications_df['Title'].str.contains(q, case=False, na=False)
        filtered_df = publications_df[mask]
        return {
            "query": q,
            "count": len(filtered_df),
            "data": filtered_df.to_dict(orient="records")
        }
    return {"message": "No publications available", "query": q, "data": []}

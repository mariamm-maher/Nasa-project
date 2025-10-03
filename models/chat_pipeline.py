import faiss
import torch
import pandas as pd
from sentence_transformers import SentenceTransformer
import subprocess
import os
import re
import traceback
import google.generativeai as genai

# =========================
# Load FAISS + Chunks Metadata
# =========================
chunks_df = pd.read_csv("paper_chunks_meta.csv")
index = faiss.read_index("paper_chunks.index")

device = "cuda" if torch.cuda.is_available() else "cpu"
embed_model = SentenceTransformer("all-mpnet-base-v2", device=device)

# =========================
# Retrieval Function
# =========================
def retrieve(query, k=5):
    q_emb = embed_model.encode([query], convert_to_numpy=True).astype("float32")
    D, I = index.search(q_emb, k)

    results = []
    for rank, idx in enumerate(I[0]):
        row = chunks_df.iloc[idx]
        results.append({
            "rank": rank + 1,
            "score": float(D[0][rank]),
            "title": row["title"],
            "paper_id": row["paper_id"],
            "chunk_id": row["chunk_id"],
            "link": row["link"],
            "chunk_text": row["chunk_text"]
        })
    return results

# =========================
# Build Context
# =========================
def build_context(results):
    context = ""
    for r in results:
        ref_tag = f"[{r['rank']}] {r['title']} (chunk {r['chunk_id']}) {r['link']}"
        context += f"{ref_tag}\n{r['chunk_text']}\n\n"
    return context.strip()

# =========================
# Gemini Integration
# =========================
def gemini_chat(query, context, model="gemini-1.5-flash", api_key=None):
    """
    Send query+context to Gemini model (default = gemini-1.5-flash).
    """
    if api_key is None:
        api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return "Error: Gemini API key not provided. Set GEMINI_API_KEY env var."

    # Configure Gemini
    genai.configure(api_key="AIzaSyAzTfCRuiJm4l2ZXSnhnETeKRObbbD9Ljg")

    prompt = (
        "You are a helpful scientific assistant. Use ONLY the following CONTEXT to answer the QUESTION. "
        "If the context does not contain an answer, say 'I don't know based on the provided context.' "
        "Do not output only citation markers (like [1], [2]) or single numbers. "
        "Answer in complete sentences.\n\n"
        f"CONTEXT:\n{context}\n\nQUESTION: {query}\n\nAnswer:"
    )

    try:
        model_instance = genai.GenerativeModel(model)
        response = model_instance.generate_content(prompt)

        if not response or not response.candidates:
            return "Error: Gemini returned empty output"

        out = response.candidates[0].content.parts[0].text.strip()

        # Detect short/citation-only responses
        import re
        if len(out) < 20 and re.match(r"^\W*\[?\d+\]?\W*$", out):
            retry_prompt = (
                "You are a helpful scientific assistant. Synthesize a short (2-4 sentence) answer using ONLY the CONTEXT. "
                "Do NOT output citation markers or bracketed numbers. "
                "If the context has no answer, say 'I don't know based on the provided context.'\n\n"
                f"CONTEXT:\n{context}\n\nQUESTION: {query}\n\nAnswer:"
            )
            retry_response = model_instance.generate_content(retry_prompt)
            if retry_response and retry_response.candidates:
                return retry_response.candidates[0].content.parts[0].text.strip()
            return "I couldn't produce a clear answer from Gemini. Here is the context I used:\n\n" + context

        return out

    except Exception as e:
        tb = traceback.format_exc()
        print("gemini_chat exception:\n", tb)
        return f"Error: Gemini invocation failed: {e}"

# =========================
# Run Example Query
# =========================

query = "Summarize Stem Cell Health and Tissue Regeneration in Microgravity"
retrieved = retrieve(query, k=5)
context = build_context(retrieved)
response = gemini_chat(query, context, model="gemini-2.5-flash", api_key="AIzaSyAzTfCRuiJm4l2ZXSnhnETeKRObbbD9Ljg")

print("User:", query)
print("Bot:", response)
print("\nReferences:")
for r in retrieved:
    print(f"[{r['rank']}] {r['title']} (chunk {r['chunk_id']}) {r['link']}")

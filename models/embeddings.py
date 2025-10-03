import torch
from sentence_transformers import SentenceTransformer
import faiss
import pandas as pd
import numpy as np

chunks_df = pd.read_csv("paper_chunks.csv")

# Embeddings Creation (with GPU support)
device = "cuda" if torch.cuda.is_available() else "cpu"
model = SentenceTransformer('all-mpnet-base-v2', device=device)
embeddings = model.encode(
    chunks_df["chunk_text"].tolist(),
    batch_size=32,
    show_progress_bar=True,
    convert_to_numpy=True,
    device=device
)

# Save embeddings for later use (e.g., summarization, classification)
np.save("paper_chunks_embeddings.npy", embeddings)

# Create FAISS index (cosine similarity), use GPU if available
d = embeddings.shape[1]  # vector dimension
if faiss.get_num_gpus() > 0:
    res = faiss.StandardGpuResources()
    index_flat = faiss.IndexFlatIP(d)
    index = faiss.index_cpu_to_gpu(res, 0, index_flat)
else:
    index = faiss.IndexFlatIP(d)  # Inner product for cosine similarity

faiss.normalize_L2(embeddings)  # normalize vectors for cosine
index.add(x=embeddings)
# Save FAISS index (move to CPU before saving if needed)
if faiss.get_num_gpus() > 0:
    faiss.write_index(faiss.index_gpu_to_cpu(index), "paper_chunks.index")
else:
    faiss.write_index(index, "paper_chunks.index")

# Save metadata separately (for retrieval mapping)
chunks_df.to_csv("paper_chunks_meta.csv", index=False)

print(f"✅ Embedded {len(embeddings)} chunks with dim {d} → saved FAISS index and embeddings.")

# query = "When did Russia resume its biomedical research space program with the Bion-M1 biosatellite?"
# q_emb = model.encode([query], convert_to_numpy=True, device=device)
# faiss.normalize_L2(q_emb)  # normalize the query embedding
# # Get top-5 similar chunks
# D, I = index.search(q_emb, 5)
# results = chunks_df.iloc[I[0]]
# print(results[["title","chunk_text"]])
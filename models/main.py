import faiss
import torch
from sentence_transformers import SentenceTransformer
import pandas as pd
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import gc

# Load data first
chunks_df = pd.read_csv("paper_chunks_meta.csv")
index = faiss.read_index("paper_chunks.index")
device = "cuda" if torch.cuda.is_available() else "cpu"

# Use the SAME model that was used to create the index
# Based on your original code, this was likely 'all-mpnet-base-v2'
embedding_model = SentenceTransformer('all-mpnet-base-v2', device=device)

def retrieve(query, k=5):
    q_emb = embedding_model.encode(query, convert_to_numpy=True).astype("float32")
    q_emb = q_emb.reshape(1, -1)
    
    # Debug: check dimensions
    print(f"Query embedding shape: {q_emb.shape}")
    print(f"Index dimension: {index.d}")
    
    if q_emb.shape[1] != index.d:
        raise ValueError(f"Embedding dimension mismatch: query={q_emb.shape[1]}, index={index.d}")
    
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

def build_context(results):
    context = ""
    for r in results:
        ref_tag = f"[{r['rank']}] {r['title']} (chunk {r['chunk_id']}) {r['link']}"
        context += f"{ref_tag}\n{r['chunk_text']}\n\n"
    return context

# Initialize LLM variables as None
llm_model = None
tokenizer = None
chatbot = None

def initialize_llm():
    global llm_model, tokenizer, chatbot
    
    if chatbot is not None:
        return  # Already initialized
    
    # Use a much smaller model to avoid memory issues
    model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
    
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    llm_model = AutoModelForCausalLM.from_pretrained(
        model_name,
        device_map="auto",
        torch_dtype=torch.float16,
        low_cpu_mem_usage=True,
        trust_remote_code=True
    )

    chatbot = pipeline(
        "text-generation",
        model=llm_model,
        tokenizer=tokenizer,
        max_new_tokens=300,
        temperature=0.7,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id
    )

def answer_with_local_llm(query, results):
    initialize_llm()
    
    context = build_context(results)
    prompt = f"""<|system|>
You are a helpful assistant that answers questions based only on the provided context.</s>
<|user|>
Context: {context}

Question: {query}

Answer based only on the context above. If the answer is not in the context, say "I don't know from the provided documents." Cite sources as [1], [2].</s>
<|assistant|>
"""
    
    try:
        output_list = chatbot(prompt)
        output = output_list[0]["generated_text"]
        response = output[len(prompt):].strip()
        return response
    except Exception as e:
        return f"Error generating response: {str(e)}"

# Test the pipeline
query = "What are the effects of microgravity on oxidative stress?"
print(f"Query: {query}")

# Check if files loaded correctly
print(f"Loaded {len(chunks_df)} chunks")
print(f"Index dimension: {index.d}")

retrieved = retrieve(query, k=5)
print(f"Retrieved {len(retrieved)} results")

response = answer_with_local_llm(query, retrieved)
print("Response:", response)
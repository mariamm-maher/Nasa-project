import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter
import re

df = pd.read_csv('scraped_papers.csv')

print(df['Full_Text'].head())

# remove tables, figures, references, and special characters


for idx, row in df.iterrows():
    text = row['Full_Text']
    text = re.sub(r'\n+', ' ', text)  # remove newlines
    text = re.sub(r'\s+', ' ', text)  # remove extra spaces
    text = re.sub(r'Table \d+:.*?(?=Table \d+:|Figure \d+:|References|$)', '', text, flags=re.DOTALL)  # remove tables
    text = re.sub(r'Figure \d+:.*?(?=Table \d+:|Figure \d+:|References|$)', '', text, flags=re.DOTALL)  # remove figures
    text = re.sub(r'References.*$', '', text, flags=re.DOTALL)  # remove references
    df.at[idx, 'Full_Text'] = text

df.to_csv('cleaned_papers.csv', index=False)
# Chunking the text into smaller parts for processing
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100,
    length_function=len
)
all_chunks = []
for idx, row in df.iterrows():
    paper_id = f"P{idx:04d}"   # create unique paper_id (e.g., P0001)
    text = row["Full_Text"]    # cleaned text
    text_chunks = splitter.split_text(text)
    for chunk_id, chunk in enumerate(text_chunks):
        all_chunks.append({
            "paper_id": paper_id,
            "chunk_id": chunk_id,
            "title": row["Title"],
            "link": row["Link"],
            "chunk_text": chunk
        })

chunks_df = pd.DataFrame(all_chunks)
chunks_df.to_csv("paper_chunks.csv", index=False)

from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForTokenClassification
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from langchain.text_splitter import RecursiveCharacterTextSplitter


from transformers import pipeline

df = pd.read_csv('cleaned_papers.csv')
splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,
    chunk_overlap=0,
    length_function=len
)
third_paper = df.iloc[2]['Full_Text']
print(third_paper[:500])
all_chunks = []
text_chunks = splitter.split_text(third_paper)
for chunk_id, chunk in enumerate(text_chunks):
    all_chunks.append({
        "paper_id": f"P0002",
        "chunk_id": chunk_id,
        "title": df.iloc[2]["Title"],
        "link": df.iloc[2]["Link"],
        "chunk_text": chunk
    })

chunks_df = pd.DataFrame(all_chunks)
triplet_extractor = pipeline('text2text-generation', model='Babelscape/rebel-large', tokenizer='Babelscape/rebel-large')

def ner_pipeline(text):
    # We need to use the tokenizer manually since we need special tokens.
    extracted_text = triplet_extractor.tokenizer.batch_decode([triplet_extractor(text,
                                                                                return_tensors=True,
                                                                                return_text=False)[0]["generated_token_ids"]])
    # Function to parse the generated text and extract the triplets
    def extract_triplets(text):
        triplets = []
        relation, subject, relation, object_ = '', '', '', ''
        text = text.strip()
        current = 'x'
        for token in text.replace("<s>", "").replace("<pad>", "").replace("</s>", "").split():
            if token == "<triplet>":
                current = 't'
                if relation != '':
                    triplets.append({'head': subject.strip(), 'type': relation.strip(),'tail': object_.strip()})
                    relation = ''
                subject = ''
            elif token == "<subj>":
                current = 's'
                if relation != '':
                    triplets.append({'head': subject.strip(), 'type': relation.strip(),'tail': object_.strip()})
                object_ = ''
            elif token == "<obj>":
                current = 'o'
                relation = ''
            else:
                if current == 't':
                    subject += ' ' + token
                elif current == 's':
                    object_ += ' ' + token
                elif current == 'o':
                    relation += ' ' + token
        if subject != '' and relation != '' and object_ != '':
            triplets.append({'head': subject.strip(), 'type': relation.strip(),'tail': object_.strip()})
        return triplets
    extracted_triplets = extract_triplets(extracted_text[0])
    print(extracted_triplets)
    return extracted_triplets
relations = []
for index, row in chunks_df.iterrows():
    print(f"Processing chunk {index+1}/{len(chunks_df)}")
    extracted_triplets = ner_pipeline(row['chunk_text'])
    for triplet in extracted_triplets:
        relations.append((triplet['head'], triplet['type'], triplet['tail']))

#saving the relations to a CSV file
relations_df = pd.DataFrame(relations, columns=['head', 'type', 'tail'])
relations_df.to_csv('extracted_relations.csv', index=False)


# G = nx.Graph()
# for entity in ner_results:
#     G.add_node(entity['entity_group'], label=entity['entity_group'])
#     G.add_node(entity['word'], label=entity['word'])
#     G.add_edge(entity['entity_group'], entity['word'])
# nx.draw(G, with_labels=True)
# plt.show()

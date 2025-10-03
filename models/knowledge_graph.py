import networkx as nx
import matplotlib.pyplot as plt
import pandas as pd
from pyvis.network import Network

triplets_df = pd.read_csv('extracted_relations.csv')
# keep dense networks only
triplets_df = triplets_df[triplets_df['tail'].map(triplets_df['tail'].value_counts()) > 3]

print(triplets_df.head())
G = nx.DiGraph()
for _, row in triplets_df.iterrows():
    G.add_node(row['head'], label=row['head'])
    G.add_node(row['tail'], label=row['tail'])
    G.add_edge(row['head'], row['tail'], label=row['type'])

# Visualize with pyvis
net = Network(notebook=True, bgcolor="#070620", font_color="white", height="750px", width="100%", directed=True)
net.from_nx(G)
net.show("knowledge_graph.html")
import requests
from bs4 import BeautifulSoup
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# importing CSV file to scrape the links
df = pd.read_csv('SB_publication_PMC.csv') # limited to first 10 rows

for link in range(len(df)):
    response = requests.get(df.loc[link, 'Link'], headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    df.loc[link, 'Full_Text'] = soup.find('section', {'class': 'body main-article-body'}).get_text()
    df.loc[link, 'Metadata'] = soup.find('section', {'aria-label': 'Article citation and metadata'}).get_text()

df.to_csv("scraped_papers.csv", index=False)
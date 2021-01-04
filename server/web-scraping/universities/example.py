import requests, re, time
from bs4 import BeautifulSoup


BASE_URL = 'https://app.testudo.umd.edu/soc/'

# do a GET request to BASE_URL that returns the page in html format
page = requests.get(BASE_URL)
# create soup object to scrape 'page'
soup = BeautifulSoup(page.content, 'html.parser')
# find the where the terms are 
terms = soup.find(id='term-id-input')
print(terms.prettify())
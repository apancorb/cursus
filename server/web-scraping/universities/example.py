import requests, re, time
from bs4 import BeautifulSoup


BASE_URL = 'https://app.testudo.umd.edu/soc/202101/CHEM/CHEM132V'

# do a GET request to BASE_URL that returns the page in html format
page = requests.get(BASE_URL)
# create soup object to scrape 'page'
soup = BeautifulSoup(page.content, 'html.parser')
<<<<<<< HEAD
# find the where the terms are 
terms = soup.find(id='term-id-input')
print(terms.prettify())
=======
# find the where the terms are

location = None
try:
    building = soup.find('span', {'class': 'building-code'}).text.strip()
    room = soup.find('span', {'class': 'class-room'}).text.strip()
    location = building + ' ' + room
except:
    location = soup.find('span', {'class': 'class-room'}).text.strip()



print(location)
print("hello world")
>>>>>>> d114a2e340176350160a28f3afb53acd515f2e29

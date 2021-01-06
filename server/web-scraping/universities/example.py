import requests, re, time
from bs4 import BeautifulSoup


BASE_URL = 'https://app.testudo.umd.edu/soc/202101/CHEM/CHEM132V'

# do a GET request to BASE_URL that returns the page in html format
page = requests.get(BASE_URL)
# create soup object to scrape 'page'
soup = BeautifulSoup(page.content, 'html.parser')
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
import sys, json
import requests 
from bs4 import BeautifulSoup
import time

def umd():
    start = time.time()

    URL = 'https://app.testudo.umd.edu/soc/'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    terms = soup.find(id='term-id-input')
    if terms == None:
        print("oops")

    # but we want also the termID, so maybe this is a good place to have a regex
    # but you might be better than me with this libray and get the answers faster
    import re  # you wana do this at top better style
    # useful link https://pythex.org/
    # any python https://www.programiz.com/python-programming/online-compiler/

    termsStr = str(terms)

    terms = re.findall(r"option value=\"([0-9]*)\">([a-zA-Z0-9 ]*)", termsStr)

    end = time.time()
    print("Time took: ", end - start)

    return terms
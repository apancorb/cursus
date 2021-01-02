# used: pymongo, dotenv, dnspython, ?mongodb?
import os
from pymongo import MongoClient
from dotenv import load_dotenv

# load the env vars from '.env'
load_dotenv()

# Given an UniversityID (i.e: "umd") and an University Object it updates the 
# new University Object in the UniversitiesDB under the UniversityID
def updateUniversity(uniID: str, uni) -> bool:
    # establish connection to the appropiate collection
    try:
        # connect to MongoDB Cluster0 
        client = MongoClient(os.getenv("UNIVERSITIESDB_CONNECTION"))
        # get UniversitiesDB 
        UniversitiesDB = client.get_database('UniversitiesDB')
        # get the appropiate collection of documents based on uniID
        if uniID == 'umd':
            records = UniversitiesDB.umds
        else:
            print(f"ERROR: uniID - {uniID} does not exist in UniversitiesDB")
            return False
    except Exception as err:
        print(f"ERROR: An error occurred while trying to connect to the appropiate collection, uniID - {uniID}")
        print(err)
        return False

    # update the terms from uni 
    try:
        # get the object data structure of the University Object 
        uni = uni.getObject()
        # update each term 
        for term in uni:
            isTermPresent = records.find_one({"termID": term["termID"]})
            if not isTermPresent:
                records.insert_one(term)
            else:
                records.update_one({"termID": term["termID"]}, {"$set": term})
    except Exception as err:
        print(f"ERROR: An error ocuurred while trying to update the terms for univID - {univID}")
        print(err)
        return False
    
    return True
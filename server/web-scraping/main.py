import sys

from models.University import University
from universities.umd import umd

from update import updateUniversity

# main function that determines which script to execute by univID
# @return University Object 
def main(uniID: str):
    # create a University object 
    uni = University()
    # build the University object using the appropiate script
    if uniID == "umd":
        timeTook = umd(uni)
    # update the document from the appropiate collection in UniversitiesDB
    print(uni)
    if not updateUniversity(uniID, uni):
        return f"Failed to update {uniID} with {timeTook}"
    # return the University Object and the time taken
    return f"Succeded to update {uniID} with {timeTook}"
    
# Start child process
if __name__ == '__main__':
    # get the corresponding univ from the system arguments
    uniID = sys.argv[1]
    # run the script that corresponds to univ
    result = main(uniID)
    # print the data we want the parent process to get
    print(result)
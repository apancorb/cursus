import sys

from models.University import University
from universities.umd import umd

def main(univID):
    # create a Univ object and pass it to the correspondance script
    uni = University()
    if univID == "umd":
        timeTook = umd(uni)
    return uni.getCollegesID('202101'), timeTook
    

# Start process
if __name__ == '__main__':
    univID = sys.argv[1] # get the corresponding univ from the system arguments 
    ret = main(univID) # run the script that corresponds to univ
    print("RESULT: ", ret)
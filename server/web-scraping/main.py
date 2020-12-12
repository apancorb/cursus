import sys

from universities.umd import umd

def main(univ):
    if univ == "umd":
        ret = umd()
    return ret 
    

# Start process
if __name__ == '__main__':
    univ = sys.argv[1] # get the corresponding univ from the system arguments
    ret = main(univ) # run the script that corresponds to univ
    print("And the updated dict iss:: ", ret)
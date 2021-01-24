import requests
import re
import time
from bs4 import BeautifulSoup

URL = 'https://courselist.wm.edu/courselist/'


def wmuTerms(uni):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    terms = soup.find_all(id='term_code')

    for option in terms[0].find_all('option'):
        if not uni.addTerm(termID=option['value'], termName=option.text):
            print(
                f"ERROR building terms for wmu -> termID: {option['value']}, termName: {option.text}")
            return False
    return True


def wmuColleges(uni, termID):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    colleges = soup.find_all(id='term_subj')

    skip = True

    for college in colleges[0].find_all('option'):
        if skip:
            skip = False
            continue
        collegeID = college['value']
        collegeName = college.text.strip()

        if not uni.addCollege(termID=termID, collegeID=college['value'], collegeName=college.text):
            print(
                f"ERROR building colleges for wmu -> termID: {termID}, collegeID: {collegeID.text}, collegeName: {collegeName.text}")
            return False
    return True


def wmuSections(uni, termID, collegeID, classID):
    # the way the webpage for this unviersity is setup, there's no link directly to a specific class so we must scrape through the whole table looking for the class name
    page = requests.get(URL + 'courseinfo/searchresults?term_code=' + termID +
                        '&term_subj=' + collegeID + '&attr=0&attr2=0&levl=0&status=0&ptrm=0&search=Search')
    soup = BeautifulSoup(page.content, 'html.parser')
    try:
        course_table = soup.find_all('td')
        for index in range(1, len(course_table), 11):
            if termID in course_table[index].text:
                sectionID = course_table[index - 1].text.strip()
                profName = course_table[index + 3].text.strip()
                totalSeats = course_table[index + 6].text.strip()
                openSeats = course_table[index + 8].text.strip()
                
                if not uni.addSection(termID=termID, collegeID=collegeID, classID=classID, sectionID=sectionID, profName=profName, totalSeats=totalSeats, openSeats=openSeats):
                    print(f"ERROR building sections for wmu -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
                    return False
                try:
                    days = course_table[index + 5].text.strip()

                    # extracts the days by scraping up until the colon
                    daysFormatted = list(days.split(':')[0].strip())

                    # standardize the formatting of hte days
                    daysStandardize = []

                    for i in range(len(daysFormatted)):
                        if len(daysFormatted) == 1:
                            if daysFormatted[i] == 'T':
                                daysStandardize.append('T')
                            elif daysFormatted[i] == 'R':
                                daysStandardize.append('R')
                            else:
                                 daysStandardize.append(daysFormatted[i])
                        else:
                            if daysFormatted[i] == 'T' and daysFormatted[i] != 'R':
                                daysStandardize.append('T')
                            elif daysFormatted[i] == 'T' and daysFormatted[i + 1] == 'R':
                                daysStandardize.append('R')
                            elif daysFormatted[i] == 'R':
                                continue
                            else:
                                daysStandardize.append(daysFormatted[i])

                    # find the start and endtimes in text format
                    endTime = days[-4:]
                    startTime = days[-9:-5]

                    # check the hours of the start and end times; add am or pm based off the hours (note times scraped are already in military time format)
                    if int(endTime[0:2]) >= 12:
                        formatEndTime = endTime[0:2] + \
                            ':' + endTime[2:] + 'pm'
                    else:
                        formatEndTime = endTime[0:2] + \
                            ':' + endTime[2:] + 'am'

                    if int(startTime[0:2]) >= 12:
                        formatStartTime = startTime[0:2] + \
                            ':' + startTime[2:] + 'pm'
                    else:
                        formatStartTime = startTime[0:2] + \
                            ':' + startTime[2:] + 'am'

                    # change the scraped time into a regular time format if necessary
                    if int(startTime[0:2]) > 12:
                        convertedStartHour = int(startTime[0:2]) - 12
                        regularStartTime = '0' + \
                            str(convertedStartHour) + \
                                ':' + startTime[2:] + 'pm'

                    if int(endTime[0:2]) > 12:
                        convertedEndHour = int(endTime[0:2]) - 12
                        regularEndTime = '0' + \
                            str(convertedEndHour) + \
                                ':' + endTime[2:] + 'pm'

                    time = []
                    time.append(formatStartTime)
                    time.append(formatEndTime)

                    if int(startTime[0:2]) > 12 or int(endTime[0:2]) > 12:
                        regular_time = regularStartTime + '-' + regularEndTime
                    else:
                        regular_time = formatStartTime + '-' + formatEndTime

                    # currently unknown if the location information can be found for the course sections
                    location = ""
                    if not uni.addTime(termID=termID, collegeID=collegeID, classID=classID, sectionID=sectionID, days=days, regular_time=regular_time, time=time, location=location):
                        print(f"ERROR building sections for wmu -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
                        return False
                except:
                    continue
        return True
    except:
        print(URL + 'courseinfo/searchresults?term_code=' + termID +
                        '&term_subj=' + collegeID + '&attr=0&attr2=0&levl=0&status=0&ptrm=0&search=Search')
        return True

def getCourseDescription(desiredLink, descriptionLinksCopy):
    descriptionURL = 'https://courselist.wm.edu' + descriptionLinksCopy[desiredLink].get('href')
    descriptionPage = requests.get(descriptionURL)
    soup2 = BeautifulSoup(descriptionPage.content, 'html.parser')
    courseDescription = soup2.find('td')
    formattedCourseDescription = courseDescription.text.strip()
    return formattedCourseDescription

def wmuClasses(uni, termID, collegeID):
    # retrieve the HTML from the page and create a soup object
    page = requests.get(URL + 'courseinfo/searchresults?term_code=' + termID + '&term_subj=' + collegeID + '&attr=0&attr2=0&levl=0&status=0&ptrm=0&search=Search')
    # create the soup object in order to scrape the webpage
    soup = BeautifulSoup(page.content, 'html.parser')
    # find classes for the specified term and college
    classes = soup.find_all('td')
    # variable that's needed to find the description for the courses because of link redirects
    descriptionLinks = soup.find_all('a')
    # the first URL link after scraping that gives a redirect to the description page is link 12
    currentLink = 12


    # the for loop goes through the table and retrieves the classId and names
    for index in range(1,len(classes),11):
        classNameIndex = index + 2
        classID = classes[index].text
        className = classes[classNameIndex].text
        formattedclassID = classID[0:9]
        courseDescription = getCourseDescription(currentLink, descriptionLinks)
        currentLink = currentLink + 1

         # add the class to the uni object 
        if not uni.addClass(termID=termID, collegeID=collegeID, classID=formattedclassID, className=className, description=courseDescription):
            print(f"ERROR building colleges for wmu -> termID: {termID}, collegeID: {collegeID}, classID: {classID}, className: {className}, description: {courseDescription}")
            return False
        # build the sections for that class
        if not wmuSections(uni, termID, collegeID, formattedclassID):
            print(f"FAILURE IN BUILDING wmu CLASSES -> termID: {termID}, collegeID: {collegeID}, classID: {formattedclassID}")
            return False
    return True

def wmu(uni):
    # start the timer 
    start = time.time()
    # build the terms 
    if not wmuTerms(uni):
        print("FAILURE IN BUILDING wmu TERMS")
        return None
    # build the colleges for each term
    for termID in uni.getTermsID():
        if not wmuColleges(uni, termID):
            print(f"FAILURE IN BUILDING wmu COLLEGES -> termID: {termID}")
            return None
        for collegeID in uni.getCollegesID(termID=termID):
            if not wmuClasses(uni, termID, collegeID):
                print(f"FAILURE IN BUILDING wmu CLASSES -> termID: {termID}, collegeID: {collegeID}")
                return None
    # end the timer
    end = time.time()
    # return time took 
    return end - start
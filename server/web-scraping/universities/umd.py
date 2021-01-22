import requests, re, time
from bs4 import BeautifulSoup

BASE_URL = 'https://app.testudo.umd.edu/soc/'

def umdTerms(uni) -> bool:
    # do a GET request to BASE_URL that returns the page in html format
    page = requests.get(BASE_URL)
    # create soup object to scrape 'page'
    soup = BeautifulSoup(page.content, 'html.parser')
    # find the where the terms are 
    terms = soup.find(id='term-id-input')
    # the results for terms is: 
    """ 
    < select id = "term-id-input" name = "termId" >
        < option value = "202008" > Fall 2020 < / option >
        < option value = "202012" > Winter 2021 < / option >
        < option selected = "selected" value = "202101" > Spring 2021 < / option >
        < option value = "202105" > Summer 2021 < / option >
    < / select >
    """
    # we could use a regular expression (re) to get the wanted data 
    # (but this is expensive so lets avoid it as much as possible)
    # or use again the Beautiful Soup library to get the wanted info like this:

    # skip the current semester 
    skip = True
    # we use the find_all to get all the options
    for option in terms.find_all('option'):
        # skip the current semester, we do not want this info for now
        if skip:
            skip = False
            continue
        # to get the value from the option tag we can do 'option['value']'
        # to get the text from the option tag we can do 'option.text'
        # now just add each term to the uni object!
        if not uni.addTerm(termID=option['value'], termName=option.text):
            print(f"ERROR building terms for umd -> termID: {option['value']}, termName: {option.text}")
            return False

    # we could have also defined 'terms' before as: terms = soup.find(id='term-id-input').find_all('option')
    return True

def umdColleges(uni, termID) -> bool:
    # do a GET request to BASE_URL + termID that returns the page in html format
    page = requests.get(BASE_URL + termID)
    # create soup object to scrape 'page'
    soup = BeautifulSoup(page.content, 'html.parser')
    # find the colleges for given termID
    colleges = soup.find_all("a", {"class": 'clearfix'})
    # add each collegeID and collegeName to its corresponding term 
    for college in colleges:
        # get the span tag for the collegeID and collegeName
        collegeID, collegeName = college.find_all("span")
        # now add to the uni object 
        if not uni.addCollege(termID=termID, collegeID=collegeID.text, collegeName=collegeName.text):
            print(f"ERROR building colleges for umd -> termID: {termID}, collegeID: {collegeID.text}, collegeName: {collegeName.text}")
            return False
    return True

def umdSections(uni, termID, collegeID, classID) -> bool:
    # do a GET request to BASE_URL + termID + collegeID + classID that returns the page in html format
    page = requests.get(BASE_URL + termID + '/' + collegeID + '/' + classID)
    # create soup object to scrape 'page'
    soup = BeautifulSoup(page.content, 'html.parser')
    try: 
        # we know find the course sections and days
        courses_sections = soup.find('div', {'class': 'sections-container'}).find_all('div', {'class': 'section-info-container'})
        courses_days = soup.find('div', {'class': 'sections-container'}).find_all('div', {'class': 'class-days-container'})

        # make sure they are of the same length 
        if len(courses_sections) != len(courses_days):
            print(f"ERROR building sections (sections and days are not same size) -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
            return False
        for i in range(len(courses_sections)):
            # get the needed info to add a section for the given classID
            sectionID = courses_sections[i].find('span', {'class': 'section-id'}).text.strip()
            profName = courses_sections[i].find('span', {'class': 'section-instructor'}).text.strip()
            totalSeats = courses_sections[i].find('span', {'class': 'total-seats-count'}).text.strip()
            openSeats = courses_sections[i].find('span', {'class': 'open-seats-count'}).text.strip()
            # add the section to the uni object to its corresponding classID
            if not uni.addSection(termID=termID, collegeID=collegeID, classID=classID, sectionID=sectionID, profName=profName, totalSeats=totalSeats, openSeats=openSeats):
                print(f"ERROR building sections for umd -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
                return False
            # get the needed info to a time to the section just added
            # we could put the following code in a separate function called umdTime() but hey
            try: 
                rows = courses_days[i].find_all('div', {'class': 'row'})
                for row in rows:
                    _days = list(row.find('span', {'class': 'section-days'}).text.strip())
                    # standarize the days list 
                    days = []
                    for j in range(len(_days)):
                        if _days[j] == 'T':
                            if _days[j + 1] == 'u':
                                days.append('T')
                            if _days[j + 1] == 'h':
                                days.append('R')
                        elif _days[j] == 'u' or _days[j] == 'h':
                            continue
                        else:
                            days.append(_days[j])
                    start_time = row.find('span', {'class': 'class-start-time'}).text.strip()
                    end_time = row.find('span', {'class': 'class-end-time'}).text.strip()
                    time = []
                    time.append(uni.regular_military_1(start_time))
                    time.append(uni.regular_military_1(end_time))
                    regular_time = start_time + ' - ' + end_time
                    location = None
                    try:
                        building = soup.find('span', {'class': 'building-code'}).text.strip()
                        room = soup.find('span', {'class': 'class-room'}).text.strip()
                        location = building + ' ' + room
                    except:
                        location = soup.find('span', {'class': 'class-room'}).text.strip()
                    if not uni.addTime(termID=termID, collegeID=collegeID, classID=classID, sectionID=sectionID, days=days, regular_time=regular_time, time=time, location=location):
                        print(f"ERROR building sections for umd -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
                        return False
            except:
                 continue
        return True
    except:
        # no worries if it goes here it means that this class has no sections or it has no days!
        print(BASE_URL + termID + '/' + collegeID + '/' + classID)
        return True

def umdClasses(uni, termID, collegeID) -> bool:
    # do a GET request to BASE_URL + termID + collegeID that returns the page in html format
    page = requests.get(BASE_URL + termID + '/' + collegeID)
    # create soup object to scrape 'page'
    soup = BeautifulSoup(page.content, 'html.parser')
    # find the classes for given termID and collegeID
    classes = soup.find_all('div', {'class': 'course'})
    # add each classID, className, and description to its corresponding term and college
    for _class in classes:
        classID = _class.find('div', {'class': 'course-id'}).text
        className = _class.find('span', {'class': 'course-title'}).text
        description = _class.find_all('div', {'class': 'approved-course-text'})
        # handle missing description 
        if description:
            description = description[-1].text  # did some cnhanges w find all
            if 'Prerequisite:' in description:
                description = None
        else:
            description = None
        # add the class to the uni object 
        if not uni.addClass(termID=termID, collegeID=collegeID, classID=classID, className=className, description=description):
            print(f"ERROR building colleges for umd -> termID: {termID}, collegeID: {collegeID}, classID: {classID}, className: {className}, description: {description}")
            return False
        # build the sections for that class
        if not umdSections(uni, termID, collegeID, classID):
            print(f"FAILURE IN BUILDING umd CLASSES -> termID: {termID}, collegeID: {collegeID}, classID: {classID}")
            return False
    return True

def umd(uni):
    # start the timer 
    start = time.time()
    # build the terms 
    if not umdTerms(uni):
        print("FAILURE IN BUILDING umd TERMS")
        return None
    # build the colleges for each term
    for termID in uni.getTermsID():
        if not umdColleges(uni, termID):
            print(f"FAILURE IN BUILDING umd COLLEGES -> termID: {termID}")
            return None
        for collegeID in uni.getCollegesID(termID=termID):
            if not umdClasses(uni, termID, collegeID):
                print(f"FAILURE IN BUILDING umd CLASSES -> termID: {termID}, collegeID: {collegeID}")
                return None
    # end the timer
    end = time.time()
    # return time took 
    return end - start

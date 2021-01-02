from datetime import datetime

class University():

    def __init__(self):
        self.univ = []

    def __str__(self) -> str:
        return str(self.univ)

    def getObject(self):
        return self.univ

    # Helper method to convert from regular time to military time using format: 05:48PM
    def regular_military_1(self, regular_time: str):
        try:
            # %I is for regular time. %H is for 24 hr time, aka "military time"
            # %p is for AM/PM
            military_hr, military_mim = datetime.strptime(regular_time, '%I:%M%p').strftime('%H:%M').split(':')
            return [int(military_hr), int(military_mim)]
        except Exception as err:
            print(f"ERROR converting from given regular ({regular_time}) to military time using format one: ")
            print(err)
            return None

    # Helper method to convert from regular time to military time using format: 05:48 PM
    def regular_military_2(self, regular_time: str):
        try:
            # %I is for regular time. %H is for 24 hr time, aka "military time"
            # %p is for AM/PM
            military_hr, military_mim = datetime.strptime(regular_time, '%I:%M%p').strftime('%H:%M').split(':')
            return [int(military_hr), int(military_mim)]
        except Exception as err:
            print(f"ERROR converting from given regular ({regular_time}) to military time using format two: ")
            print(err)
            return None

    def getIndexTerm(self, termID: str) -> int:
        try:
            index = 0 
            for term in self.univ:
                if term.get("termID") == termID:
                    return index
                index += 1
            print(f"Index for the given termID ({termID}) was not found. Make sure that the termID passed in exists in the current instance of Univ")
            return None
        except Exception as err:
            print(f"ERROR getting termID ({termID}) index from Univ object: ")
            print(err)
            return None

    def getIndexCollege(self, termIndex: int, collegeID: str) -> int:
        try:
            index = 0
            for college in self.univ[termIndex]["colleges"]:
                if college.get("collegeID") == collegeID:
                    return index
                index += 1
            print(f"Index for the given collegeID ({collegeID}) was not found. Make sure that the collegeID passed in exists in the current instance of Univ")
            return None
        except Exception as err:
            print(f"ERROR getting collegeID ({collegeID}) index from Univ object: ")
            print(err)
            return None

    def getIndexClass(self, termIndex: int, collegeIndex: int, classID: str) -> int:
        try:
            index = 0
            for clas in self.univ[termIndex]["colleges"][collegeIndex]["classes"]:
                if clas.get("classID") == classID:
                    return index
                index += 1
            print(f"Index for the given classID ({classID}) was not found. Make sure that the collegeID passed in exists in the current instance of Univ")
            return None
        except Exception as err:
            print(f"ERROR getting classID ({classID}) index from Univ object: ")
            print(err)
            return None

    def getIndexSection(self, termIndex: int, collegeIndex: int, classIndex: int, sectionID: str) -> int:
        try:
            index = 0
            for section in self.univ[termIndex]["colleges"][collegeIndex]["classes"][classIndex]["sections"]:
                if section.get("sectionID") == sectionID:
                    return index
                index += 1
            print(f"Index for the given sectionID ({sectionID}) was not found. Make sure that the sectionID passed in exists in the current instance of Univ")
            return None
        except Exception as err:
            print(f"ERROR getting sectionID ({sectionID}) index from Univ object: ")
            print(err)
            return None

    def addTerm(self, termID: str, termName: str) -> bool:
        try:
            self.univ.append({"termID": termID, "termName": termName, "colleges": []})
            return True
        except Exception as err:
            print(f"ERROR adding term ({termID}, {termName}) to Univ object: ")
            print(err)
            return False
    
    def addCollege(self, termID: str, collegeID: str, collegeName: str) -> bool:
        try:
            termIndex = self.getIndexTerm(termID)
            if not isinstance(termIndex, int):
                print(f"ERROR in adding college: Univ path you are currently trying to add => Univ -> termID: {termID}")
                return False
            self.univ[termIndex]["colleges"].append({"collegeID": collegeID, "collegeName": collegeName, "classes": []})
            return True
        except Exception as err:
            print(f"ERROR adding college ({termID}, {collegeID}, {collegeName}) to Univ object: ")
            print(err)
            return False

    def addClass(self, termID: str, collegeID: str, classID: str, className: str, description: str) -> bool:
        try:
            termIndex = self.getIndexTerm(termID)
            if not isinstance(termIndex, int):
                print(f"ERROR in adding class: Univ path you are currently trying to add => Univ -> termID: {termID}")
                return False
            collegeIndex = self.getIndexCollege(termIndex, collegeID)
            if not isinstance(collegeIndex, int):
                print(f"ERROR in adding class: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID}")
                return False
            self.univ[termIndex]["colleges"][collegeIndex]["classes"].append({"classID": classID, "className": className, "description": description, "sections": []})
            return True
        except Exception as err:
            print(f"ERROR adding class ({termID}, {collegeID}, {classID}, {className}, {description}) to Univ object: ")
            print(err)
            return False

    def addSection(self, termID: str, collegeID: str, classID: str, sectionID: str, profName: str, totalSeats: str, openSeats: str) -> bool:
        try:
            termIndex = self.getIndexTerm(termID)
            if not isinstance(termIndex, int):
                print(f"ERROR in adding section: Univ path you are currently trying to add => Univ -> termID: {termID}")
                return False
            collegeIndex = self.getIndexCollege(termIndex, collegeID)
            if not isinstance(collegeIndex, int):
                print(f"ERROR in adding section: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID}")
                return False
            classIndex = self.getIndexClass(termIndex, collegeIndex, classID)
            if not isinstance(classIndex, int):
                print(f"ERROR in adding section: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID} -> classID: {classID}")
                return False
            self.univ[termIndex]["colleges"][collegeIndex]["classes"][classIndex]["sections"].append({"sectionID": sectionID, "profName": profName, "totalSeats": totalSeats, "openSeats": openSeats, "times": []})
            return True
        except Exception as err:
            print(f"ERROR adding section ({termID}, {collegeID}, {classID}, {sectionID}, {profName}, {totalSeats}, {openSeats}) to Univ object: ")
            print(err)
            return False
    
    def addTime(self, termID: str, collegeID: str, classID: str, sectionID: str, days: list, time: list, location: str) -> bool:
        try:
            termIndex = self.getIndexTerm(termID)
            if not isinstance(termIndex, int):
                print(f"ERROR in adding time: Univ path you are currently trying to add => Univ -> termID: {termID}")
                return False
            collegeIndex = self.getIndexCollege(termIndex, collegeID)
            if not isinstance(collegeIndex, int):
                print(f"ERROR in adding time: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID}")
                return False
            classIndex = self.getIndexClass(termIndex, collegeIndex, classID)
            if not isinstance(classIndex, int):
                print(f"ERROR in adding time: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID} -> classID: {classID}")
                return False
            sectionIndex = self.getIndexSection(termIndex, collegeIndex, classIndex, sectionID)
            if not isinstance(sectionIndex, int):
                print(f"ERROR in adding time: Univ path you are currently trying to add => Univ -> termID: {termID} -> collegeID: {collegeID} -> classID: {classID} -> sectionID: {sectionID}")
                return False
            self.univ[termIndex]["colleges"][collegeIndex]["classes"][classIndex]["sections"][sectionIndex]["times"].append({"days": days, "time": time, "location": location})
            return True
        except Exception as err:
            print(f"ERROR adding section ({termID}, {collegeID}, {classID}, {sectionID}, {days}, {time}, {location}) to Univ object: ")
            print(err)
            return False

    def getTermsID(self):
        try:
            termsID = []
            for term in self.univ:
                termsID.append(term["termID"])
            return termsID
        except Exception as err:
            print(f"ERROR getting termsID: ")
            print(err)
            return []

    def getCollegesID(self, termID):
        try:
            termIndex = self.getIndexTerm(termID)
            if not isinstance(termIndex, int):
                print(f"ERROR in getting collegesID: Univ path you are currently trying to get => Univ -> termID: {termID}")
                return []
            collegesID = []
            for college in self.univ[termIndex]["colleges"]:
                collegesID.append(college["collegeID"])
            return collegesID
        except Exception as err:
            print(f"ERROR getting collegesID -> termID: {termID}: ")
            print(err)
            return []
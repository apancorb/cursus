# Example of how the Univ object might look like
# The real example here is for the University of Maryland, College Park 

[
    {
        termID: "202008",
        termName: "Fall 2020",
        colleges: [
            {
                collegeID: "CMSC",
                collegeName: "Computer Science",
                classes: [
                    {
                        classID: "CMSC131",
                        className: "Object-Oriented Programming I",
                        description: "Introduction to programming and computer science...", # if no description, use None
                        sections: [
                            {
                                sectionID: "0101",
                                profName: "Nelson Padua-Perez",
                                totalSeats: "32",
                                openSeats: "8",
                                times: [
                                    {
                                        days: ["M", "W", "F"],
                                        time: [[10, 10], [10, 50]], # for now the numbers can be of type int or str 
                                        location: "ONLINE"
                                    },
                                    {
                                        days: ["T", "R"],
                                        time: [[15, 15], [16, 30]],
                                        location: "ESJ 0224"
                                    },
                                    "..."
                                ]
                            },
                            "..."
                        ]
                    },
                    "..."
                ]
            },
            "..."
        ]
    },
    "..."
]

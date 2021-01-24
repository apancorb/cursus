# 🎓 **Cursus** 🎓

---

- **Abstract:** Cursus is a tool designed for higher education students that serves as a schedule builder, review site, and more by providing an immersive and exiting user experience.
- **Stack:** JavaScript, Python, Node.js / Express, React.js, MongoDB.

---

no voy a poner limit en reviews and comment per user
no validation for adult content
refreshing always takes to home page

## 📁 **Project Structure** 📁

<details> <summary>Client</summary>
    
</details>

<details> <summary>Server</summary>

</details>

---

### 💻 Client 💻

---

### 💻 Server 💻

Contains the server side (backend) of cursus written in JavaScript and Python.

#### server.js

- **Path:** /server/server.js
- **Dependencies:** "cors": "^2.8.5", "dotenv": "^8.2.0", "express": "^4.17.1","mongoose": "^5.11.7", "nodemon": "^2.0.6", "python-shell": "^2.0.3"
- **Description:** The server.js file is the entry point into the api, it configures application middleware, binds controllers to routes and starts the Express web server for the api.

### web-scraping

Contains the web-scraping side of the server where it periodically runs Python scripts that updates and generates all the data related to courses and stores it in a MongoDB database. This data will later be served by the server to the client as needed.

#### main.py

- **Path:** /server/web-scraping/main.py
- **Dependencies:** sys, json
- **Description:** The main python script acts as the first and last point of contact from a child process created by the server. One of the reasons why we create a child process from the server is that it gives the ability to run python code and communicate with the server via stdin and stdout. Furthermore, web-scraping is a heavy computation task that can take some time to finish. Therefore, since the server is a Node.js application it would suffer a lot from it in a performance perspective since it is not suitable to perform heavy computations.

---

## Unofficial Notes (put down anything here):

**Universities that we are looking to do for now (add comments bellow):**

- umd for sure lol
- University of Florida (UF) sounds very good because of the huge size of the university (5th largest in USA), other people have tried this but is basically broken shitty sites and there is actually people who really want a service like cursus. Plus, they apparenlty have an API for their courses that we can use which is less work than scraping the data which would make the development faster and easier for the scraper/python team. I think this one is a must for sure. update: the api is kind of shit, maybe a better option is to scrape the data ourselves becuase I dont think we can rely in this third part api long term. update: couldnt find a way to search using the routes so is either using their api or nothing basically unless we find the routes
- Arizona State University would be a great univ that would benefit a lot from something like cursus. But there is a problem, this is a huge university like insane, so it is a lot of data that we cant handle yet plus scraping the data would be a challenge.
- Boston Univeristy pretty good, it can be web-scraped I verified it. Very good size etc. Only con I see is that it prob would have to make a request per course inspection but I mean it shouldnt be that bad.
- University of Virginia very easy to web scrape thanks to a student from there which puts all the data in a single page for each semester. It can be websraped.
- University of Michigan is great because you can get a csv file with all the info. So far the easiest
  since u dont have to scrape, only parse the csv file.

[javascript]: https://en.wikipedia.org/wiki/JavaScript
[py]: https://en.wikipedia.org/wiki/Python_(programming_language)
[node]: https://en.wikipedia.org/wiki/Node.js
[react]: https://en.wikipedia.org/wiki/React_(web_framework)
[mongodb]: https://en.wikipedia.org/wiki/MongoDB

import Scheduler from "devextreme-react/scheduler";
import React, { useState, useEffect } from "react";
import axios from "axios";

import SchedulerComponent from "./scheduler/Scheduler.js";
import Sidebar from "./siderbar/Sidebar.js";
import Selector from "./selector/Selector.js";
import "./Schedule.css";

function Schedule() {
  // for the current term to be used
  const [currentTerm, setCurrentTerm] = useState({});
  // to render the scheduler once initial boot up
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // function to update local terms
    function updateLocalTerms(serverTerms, localTerms) {
      // create a set of termIDs from the server
      var serverTermIDs = new Set();
      serverTerms.forEach((st) => {
        serverTermIDs.add(st.termID);
      });
      // from local terms keep only the terms supported by the server
      localTerms = [...localTerms].filter((lt) => serverTermIDs.has(lt.termID));
      // add any new terms supported by the server
      serverTerms.forEach((st) => {
        var isPresent = false;
        localTerms.forEach((lt) => {
          if (st.termID === lt.termID) {
            isPresent = true;
          }
        });
        if (!isPresent) {
          localTerms.push({
            termID: st.termID,
            termName: st.termName,
            colleges: [],
            courses: [],
          });
        }
      });
      // return updated local terms
      return localTerms;
    }

    // function to perform on schedule mount
    async function onMount() {
      var serverTerms = null;
      try {
        serverTerms = await axios.get("/schedule/terms");
      } catch (err) {
        console.log("Error on schedule mount: ", err);
        return null;
      }
      if (localStorage.getItem("terms") === null) {
        // set the terms key map to an empty list
        localStorage.setItem("terms", JSON.stringify([]));
      }
      // get the local terms
      var localTerms = JSON.parse(localStorage.getItem("terms"));
      // update local terms
      localTerms = updateLocalTerms(serverTerms.data, localTerms);
      // set the newly updated local terms in local storage
      localStorage.setItem("terms", JSON.stringify(localTerms));
      // by default set the current term to the first object in localTerm
      setCurrentTerm(localTerms[0]);
      // now we can render the scheduler component
      setIsMounted(true);
    }
    // run on mount
    onMount();
  }, []);

  useEffect(() => {
    function localTermsUpdate() {
      // get the local terms
      var localTerms = JSON.parse(localStorage.getItem("terms"));
      if (!localTerms) return null;
      // find the index for the currentTerm in localTerms
      localTerms.forEach((element, index) => {
        if (currentTerm.termID === element.termID) {
          localTerms[index] = currentTerm;
        }
      });
      // set the updated local terms
      localStorage.setItem("terms", JSON.stringify(localTerms));
    }
    localTermsUpdate();
  }, [currentTerm]);

  return (
    <div className="schedule">
      <div className="schedule-content-down">
        {isMounted && (
          <Selector currentTerm={currentTerm} setCurrentTerm={setCurrentTerm} />
        )}
      </div>
      <div className="schedule-content-top">
        <div className="schedule-content-left">
          {isMounted && (
            <SchedulerComponent
              currentTerm={currentTerm}
              setCurrentTerm={setCurrentTerm}
            />
          )}
        </div>
        <div className="schedule-content-right">
          {isMounted && (
            <Sidebar
              currentTerm={currentTerm}
              setCurrentTerm={setCurrentTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;

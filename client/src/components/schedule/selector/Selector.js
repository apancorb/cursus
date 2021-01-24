import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import RowSchedule from "./row-schedule/RowSchedule.js";
import "./Selector.css";

function Selector({ currentTerm, setCurrentTerm }) {
  // for displaying list of all possible Colleges
  const [collegeSelect, setCollegeSelect] = useState([]);
  // for choosing row of classes depending in College
  const [college, setCollege] = useState("");

  useEffect(() => {
    const fetchCollegeSelect = async () => {
      try {
        const serverColleges = await axios({
          method: "get",
          url: "/schedule/colleges",
          params: {
            termID: currentTerm.termID,
          },
        });
        setCollegeSelect(serverColleges.data[0].colleges);
      } catch (err) {
        console.log("Error trying to get College selector data: ", err);
        return null;
      }
    };
    fetchCollegeSelect();
  }, [currentTerm]);

  // term change handler if the user selects another term
  const termChangeHandler = (e) => {
    JSON.parse(localStorage.getItem("terms")).forEach((term) => {
      if (e.target.value === term.termName) {
        setCurrentTerm(term);
      }
    });
  };

  const collegeChangeHandler = (e) => {
    // e.target.value is the collegeID
    setCollege(e.target.value);
  };

  const collegeSubmitHandler = () => {
    if (college === "") {
      return null;
    }
    var isAlreadyPresent = false;
    currentTerm.colleges.forEach((c) => {
      if (c === college) {
        isAlreadyPresent = true;
      }
    });
    if (isAlreadyPresent) {
      return null;
    }
    let updated = currentTerm.colleges;
    updated.push(college);
    setCurrentTerm({
      ...currentTerm,
      colleges: updated,
    });
  };

  return (
    <div className="selector">
      <div className="selector-form">
        <select
          onChange={termChangeHandler}
          name="terms"
          className="terms-select"
        >
          {JSON.parse(localStorage.getItem("terms")).map((term) => (
            <option value={term.termName}>{term.termName}</option>
          ))}
        </select>
        <select
          name="colleges"
          className="colleges-select"
          onChange={collegeChangeHandler}
        >
          {collegeSelect.map((term) => (
            <option value={term.collegeID}>
              {term.collegeID} - {term.collegeName}
            </option>
          ))}
        </select>
        <div className="selector__buttons">
          <button onClick={collegeSubmitHandler} className="selector__button">
            Search
          </button>
        </div>
      </div>
      {currentTerm.colleges.map((c) => (
        <RowSchedule
          collegeID={c}
          currentTerm={currentTerm}
          setCurrentTerm={setCurrentTerm}
        />
      ))}
    </div>
  );
}

export default Selector;

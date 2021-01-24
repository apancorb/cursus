import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import CardSchedule from "./card-schedule/CardSchedule.js";
import "./RowSchedule.css";

function RowSchedule({ collegeID, currentTerm, setCurrentTerm }) {
  const [collegeName, setCollegeName] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const serverClasses = await axios({
          method: "get",
          url: "/schedule/classes",
          params: {
            termID: currentTerm.termID,
            collegeID: collegeID,
          },
        });

        setCollegeName(serverClasses.data[0].colleges[0].collegeName);
        setClasses(serverClasses.data[0].colleges[0].classes);
      } catch (err) {
        console.log("Error trying to get class data: ", err);
        return null;
      }
    };
    fetchClasses();
  }, []);

  const deleteCollegeHandler = () => {
    let updated = currentTerm.colleges;
    updated = [...updated].filter((c) => c !== collegeID);
    setCurrentTerm({
      ...currentTerm,
      colleges: updated,
    });
  };

  return (
    <div className="row">
      <div className="row-schedule-header">
        <h2>{collegeName}</h2>
        <Button className="delete-college-bttn" onClick={deleteCollegeHandler}>
          <DeleteIcon fontSize="medium" />
        </Button>
      </div>
      <div className="row__posters">
        {classes.map((c) => (
          <CardSchedule
            classes={c}
            currentTerm={currentTerm}
            setCurrentTerm={setCurrentTerm}
          />
        ))}
      </div>
    </div>
  );
}

export default RowSchedule;

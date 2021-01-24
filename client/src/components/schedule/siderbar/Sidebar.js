import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import Paper from "@material-ui/core/Paper";

import "./Sidebar.css";

function Class({ course, currentTerm, setCurrentTerm }) {
  // to delete a class from the sidebar
  const deleteHandler = () => {
    let updated = currentTerm.courses;
    updated = [...updated].filter((c) => c.sectionID !== course.sectionID);
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
  };

  // to mark a class as complete (ie. show in the scheduler the class)
  const completeHandler = () => {
    let updated = currentTerm.courses;
    updated = [...updated].map((c) => {
      if (c.sectionID === course.sectionID) {
        return {
          ...c,
          show: !c.show,
        };
      }
      return c;
    });
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
  };

  return (
    <div className="side-class">
      <li className={`side-item ${course.show ? "completed" : ""}`}>
        <Typography>
          {course.sectionID} {course.classID}
        </Typography>
        <Typography color="textSecondary">
          {course.openSeats}/{course.totalSeats}
        </Typography>
      </li>
      <Button
        className="complete-btn"
        style={{ color: "green" }}
        onClick={completeHandler}
      >
        <AddCircleIcon className="fas fa-check"></AddCircleIcon>
      </Button>
      <Button
        className="trash-btn"
        style={{ color: "red" }}
        onClick={deleteHandler}
      >
        <RemoveCircleIcon className="fas fa-trash"></RemoveCircleIcon>
      </Button>
    </div>
  );
}

function Side({ course, currentTerm, setCurrentTerm }) {
  // to delete a class from the sidebar
  const deleteHandler = () => {
    let updated = currentTerm.courses;
    updated = [...updated].filter(
      (c) => c.sectionID !== course.sectionID || c.classID !== course.classID
    );
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
  };

  // to mark a class as complete (ie. show in the scheduler the class)
  const completeHandler = () => {
    let updated = currentTerm.courses;
    updated = [...updated].map((c) => {
      if (c.sectionID === course.sectionID && c.classID === course.classID) {
        return {
          ...c,
          show: !c.show,
        };
      }
      return c;
    });
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
  };

  return (
    <div className="side-course">
      <Card>
        <div className="side-main-course">
          <div
            onClick={completeHandler}
            className={`side-left-course ${course.show ? "completed" : ""}`}
          >
            <Typography color="primary">
              {course.sectionID} {course.classID}
            </Typography>
            <Typography>{course.profName}</Typography>
            <Typography color="textSecondary">
              {course.openSeats}/{course.totalSeats}
            </Typography>
          </div>
          <div className="side-right-course">
            <Button onClick={deleteHandler}>
              <DeleteIcon fontSize="medium" style={{ color: "gray" }} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Sidebar({ currentTerm, setCurrentTerm }) {
  const [numCourses, setNumCourses] = useState(0);

  useEffect(() => {
    const countNumberOfShownCourses = () => {
      let count = 0;
      currentTerm.courses.forEach((c) => {
        if (c.show === false) {
          count += 1;
        }
      });
      setNumCourses(count);
    };
    countNumberOfShownCourses();
  }, [currentTerm]);

  return (
    <div className="select">
      <h1 className="num-courses">{`Courses: ${numCourses}`}</h1>
      <div className="course-container">
        <ul className="course-list">
          {currentTerm.courses.map((course) => (
            <Side
              course={course}
              currentTerm={currentTerm}
              setCurrentTerm={setCurrentTerm}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

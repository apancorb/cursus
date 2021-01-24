import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ReviewsNav.css";

function ReviewsNav({ reviews, setReviews }) {
  const [profs, setProfs] = useState([]);
  const [classID, setClassID] = useState([]);
  const [className, setClassName] = useState([]);

  const [searchBy, setSearchBy] = useState("prof");
  const [searchWhat, setSearchWhat] = useState("");

  useEffect(() => {
    const getAvailableProfsAndClasses = async () => {
      try {
        const serverProfs = await axios.get("/reviews/getProfs");
        const serverClassID = await axios.get("/reviews/getClassID");
        const serverClassName = await axios.get("/reviews/getClassName");
        setClassID(serverClassID.data);
        setClassName(serverClassName.data);
        setProfs(serverProfs.data);
        // also set the first one
        setSearchWhat(serverProfs.data[0]);
      } catch (err) {
        console.log("Error getAvailableProfsAndClasses: ", err);
      }
      return null;
    };
    getAvailableProfsAndClasses();
  }, []);

  const searchByChangeHandler = (e) => {
    setSearchBy(e.target.value);
    if (e.target.value === "prof") {
      setSearchWhat(profs[0]);
    } else if (e.target.value === "classID") {
      setSearchWhat(classID[0]);
    } else if (e.target.value === "className") {
      setSearchWhat(className[0]);
    } else {
      alert("Please, select both fiedls before searching");
    }
  };

  const searchWhatChangeHandler = (e) => {
    setSearchWhat(e.target.value);
  };

  const profSearchHandler = () => {
    return profs.map((p) => <option value={p}>{p}</option>);
  };

  const classIDSearchHandler = () => {
    return classID.map((c) => <option value={c}>{c}</option>);
  };

  const classNameSearchHandler = () => {
    return className.map((c) => <option value={c}>{c}</option>);
  };

  const searchSubmitHandler = () => {
    let isPresent = false;
    reviews.forEach((r) => {
      if (r.search === searchWhat) {
        isPresent = true;
      }
    });
    if (!isPresent) {
      setReviews((reviews) => [
        ...reviews,
        { type: searchBy, search: searchWhat },
      ]);
    }
  };

  return (
    <div className="reviews-nav-form">
      <select className="select-by-review" onChange={searchByChangeHandler}>
        <option value="prof">Professor</option>
        <option value="classID">Class ID</option>
        <option value="className">Class Name</option>
      </select>
      <select
        className="select-by-review-search"
        onChange={searchWhatChangeHandler}
      >
        {searchBy === "prof"
          ? profSearchHandler()
          : searchBy === "classID"
          ? classIDSearchHandler()
          : classNameSearchHandler()}
      </select>
      <button onClick={searchSubmitHandler} className="review-button">
        Search
      </button>
    </div>
  );
}

export default ReviewsNav;

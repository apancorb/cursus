import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Banner.css";

const uniName = {
  umd: "University of Maryland",
};

function Banner() {
  const university = useSelector((state) => state.university);
  const [banner, setBanner] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/banner");
        setBanner(response.data[0]);
      } catch (error) {
        console.log("Error Banner: ", error);
      }

      return null;
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        background: "cover",
        backgroundImage: `url(${banner?.imageURL})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{uniName[university]}</h1>
        {/* This would be pulled from redux or react context api*/}
        <div className="banner__buttons">
          <Link to="/schedule">
            <button className="banner__button">My Schedule</button>
          </Link>
          <Link to="/reviews">
            <button className="banner__button">Reviews</button>
          </Link>
          <Link to="/alerts">
            <button className="banner__button">My Alerts</button>
          </Link>
        </div>
        <h1 className="banner__description">
          {truncate(banner?.imageDescription, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

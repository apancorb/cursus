import React from "react";

import RowHome from "./row-home/RowHome.js";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <RowHome title="Top Reviews" fetchUrl="/home/topReviews" />
      <RowHome title="Top Instructors" fetchUrl="/home/topProfs" />
      <RowHome title="Top Courses" fetchUrl="/home/topCourses" />
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";

import ReviewsNav from "./reviews-nav/ReviewsNav.js";
import ReviewsForm from "./reviews-form/ReviewsForm.js";
import ReviewsRow from "./review-row/ReviewsRow.js";

import "./Reviews.css";

function Reviews() {
  // the current rows of reviews the user is intrested on
  const [reviews, setReviews] = useState([]);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    const getReviewsFromLocalStorage = () => {
      let localReviews = JSON.parse(localStorage.getItem("reviews"));
      if (!localReviews) {
        localStorage.setItem("reviews", JSON.stringify([]));
        localReviews = [];
      }
      setReviews(localReviews);
      setIsMount(true);
    };
    getReviewsFromLocalStorage();
  }, []);

  useEffect(() => {
    const updatedLocalStorage = () => {
      if (isMount) localStorage.setItem("reviews", JSON.stringify(reviews));
    };
    updatedLocalStorage();
  }, [reviews]);

  return (
    <div className="reviews">
      <div className="reviews-nav">
        <ReviewsNav reviews={reviews} setReviews={setReviews} />
        <ReviewsForm setReviews={setReviews} />
      </div>
      {reviews.map((r) => (
        <ReviewsRow review={r} reviews={reviews} setReviews={setReviews} />
      ))}
    </div>
  );
}

export default Reviews;

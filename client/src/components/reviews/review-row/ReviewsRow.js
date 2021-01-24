import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import CardReviews from "./review-card/ReviewsCard.js";
import "./ReviewsRow.css";

function ReviewsRow({ review, reviews, setReviews }) {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const serverReviews = await axios({
          method: "get",
          url: `/reviews/${review.type}`,
          params: {
            param: review.search,
          },
        });
        setRow(serverReviews.data.sort((a, b) => (b.votes > a.votes ? 1 : -1)));
      } catch (err) {
        console.log("Error getting reviews: ", err);
      }
    };
    fetchReviews();
  }, []);

  const deleteReviewHandler = () => {
    let updated = reviews;
    updated = [...updated].filter((r) => r.search !== review.search);
    setReviews(updated);
  };

  return (
    <div className="row">
      <div className="row-review-header">
        <h2>{review.search}</h2>
        <Button className="delete-review-bttn" onClick={deleteReviewHandler}>
          <DeleteIcon fontSize="medium" />
        </Button>
      </div>
      <div className="row__posters">
        {row.map((r) => (
          <CardReviews type={review.type} review={r} />
        ))}
      </div>
    </div>
  );
}

export default ReviewsRow;

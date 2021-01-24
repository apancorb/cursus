import React, { useState } from "react";

import Modal from "../reviews-modal/Modal.js";
import "./ReviewsForm.css";

function ReviewsForm() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="reviews-create">
      <button className="create-review-bttn" onClick={() => setShowModal(true)}>
        Create Review
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default ReviewsForm;

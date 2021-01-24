import React, { useState } from "react";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";

import useModal from "./useModal.js";
import validate from "./validateInfo.js";
import "./Modal.css";

Modal.setAppElement("#root");

function CustomModal({ reviewID, showModal, setShowModal }) {
  const { handleChange, values, handleSubmit, errors } = useModal(
    () => setShowModal(false),
    validate,
    reviewID
  );

  return (
    <Modal
      isOpen={showModal}
      closeTimeoutMS={2000}
      onRequestClose={() => setShowModal(false)}
      style={{
        overlay: {},
        content: {
          border: "10rem",
          left: "20rem",
          right: "20rem",
          top: "10rem",
          bottom: "15rem",
          background: "gray",
        },
      }}
    >
      <form className="form-review" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", color: "white", marginRight: 100 }}>
          Create a Comment!
        </h1>

        <div className="form-inputs">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <input
            id="comment"
            type="comment"
            name="comment"
            className="form-input"
            placeholder="Enter your comment here"
            value={values.comment}
            onChange={handleChange}
          />
          {errors.comment && <p>{errors.comment}</p>}
          {errors.global && <p>{errors.global}</p>}
        </div>

        <button className="form-input-btn" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default CustomModal;

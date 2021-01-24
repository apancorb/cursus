import React, { useState } from "react";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoopIcon from "@material-ui/icons/Loop";

import useModal from "./useModal.js";
import validate from "./validateInfo.js";
import "./Modal.css";

Modal.setAppElement("#root");

function CustomModal({ showModal, setShowModal }) {
  const { handleChange, values, handleSubmit, errors } = useModal(
    () => setShowModal(false),
    validate
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
          background: "gray",
        },
      }}
    >
      <form className="form-review" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center", color: "white", marginRight: 100 }}>
          Create a Cursus Review!
        </h1>

        <div className="form-inputs">
          <label htmlFor="classID" className="form-label">
            Class ID
          </label>
          <input
            id="classID"
            type="classID"
            name="classID"
            className="form-input"
            placeholder="Enter the class ID"
            value={values.classID}
            onChange={handleChange}
          />
          {errors.classID && <p>{errors.classID}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="className" className="form-label">
            Class Name
          </label>
          <input
            id="className"
            type="className"
            name="className"
            className="form-input"
            placeholder="Enter the name of the class"
            value={values.className}
            onChange={handleChange}
          />
          {errors.className && <p>{errors.className}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="profName" className="form-label">
            Instructor Name
          </label>
          <input
            id="profName"
            type="profName"
            name="profName"
            className="form-input"
            placeholder="Enter the instructor's name"
            value={values.profName}
            onChange={handleChange}
          />
          {errors.profName && <p>{errors.profName}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="title"
            name="title"
            className="form-input"
            placeholder="Enter the title for your review"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="description" className="form-label">
            Review
          </label>
          <input
            id="description"
            type="description"
            name="description"
            className="form-input"
            placeholder="Enter your review here"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="grade" className="form-label">
            Grade Received/Anticipated (Optional)
          </label>
          <select
            id="grade"
            type="grade"
            name="grade"
            className="form-input"
            value={values.grade}
            placeholder="Enter your grade received or anticipated"
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A- </option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B- </option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C- </option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D- </option>
            <option value="F">F</option>
            <option value="Dropped">Dropped</option>
            <option value="Other">Other</option>
          </select>
          {errors.grade && <p>{errors.grade}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="classExp" className="form-label">
            Rate your Class Experience (Optional)
          </label>
          <select
            id="classExp"
            type="classExp"
            name="classExp"
            className="form-input"
            value={values.classExp}
            placeholder="Rate your Class Experience"
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Neutral">Normal</option>
            <option value="Bad">Bad</option>
            <option value="Awful">Awful</option>
          </select>
          {errors.classExp && <p>{errors.classExp}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="profExp" className="form-label">
            Rate your Instructor Experience (Optional)
          </label>
          <select
            id="profExp"
            type="profExp"
            name="profExp"
            className="form-input"
            value={values.profExp}
            placeholder="Rate your Instructor Experience"
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Neutral">Normal</option>
            <option value="Bad">Bad</option>
            <option value="Awful">Awful</option>
          </select>
          {errors.profExp && <p>{errors.profExp}</p>}
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

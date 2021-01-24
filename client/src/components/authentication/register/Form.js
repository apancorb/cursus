import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import "./Form.css";

import { isLogin } from "./../../../actions/index.js";

function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  function submitForm() {
    setIsSubmitted(true);
  }

  useEffect(() => {
    if (isSubmitted) {
      dispatch(isLogin());
    }
  }, [isSubmitted]);

  return (
    <>
      <div className="form">
        <div className="form-container">
          <div className="form-content-left">
            <img src="img/img-2.svg" alt="spaceship" className="form-img" />
          </div>

          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </div>
    </>
  );
}

export default Form;

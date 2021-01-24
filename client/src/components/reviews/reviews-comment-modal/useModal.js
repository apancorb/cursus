import { useState, useEffect } from "react";

/* custom made React hook to handle review submission */
const useModal = (callback, validate, reviewID) => {
  // values state
  const [values, setValues] = useState({
    comment: "",
    reviewID: reviewID,
  });
  // errors state
  const [errors, setErrors] = useState({});
  // isSubmmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handles the change of text entries in the submission form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // handles the submission of the register form
  const handleSubmit = (e) => {
    e.preventDefault();
    // validates all the values to check for errors
    validate(values)
      .then((res) => {
        setErrors(res);
      })
      .catch((err) => {
        console.log("ERROR occurred validating login data", err);
        alert("Unknown error occurred with given input");
      });
    // sets is submitting to true
    setIsSubmitting(true);
  };

  // checks for changes in the errors state and if there are none it callback
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      window.location.reload();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useModal;

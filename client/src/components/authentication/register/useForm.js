import { useState, useEffect } from "react";

/* custom made React hook to handle authentication */

const useForm = (callback, validate) => {
  // values state
  const [values, setValues] = useState({
    email: "",
    university: "",
    password: "",
    password2: "",
    global: "",
  });
  // errors state
  const [errors, setErrors] = useState({});
  // isSubmmitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handles the change of text entries in the register form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // handles the submission of the register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validates all the values to check for errors
    validate(values)
      .then((res) => {
        setErrors(res);
      })
      .catch((err) => {
        console.log("ERROR occurred validating register data", err);
        alert("Unknown error occurred with given input");
      });
    // sets is submitting to true
    setIsSubmitting(true);
  };

  // checks for changes in the errors state and if there are none it callback
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log("erros in useform", errors);
      callback();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
};

export default useForm;

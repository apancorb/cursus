import axios from "axios";

const universities = { "University of Maryland, College Park": "umd" };

export default async function validateInfo(values) {
  let errors = {};

  // email
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  // university
  if (!values.university.trim()) {
    errors.university = "University required";
  } else if (!(values.university in universities)) {
    errors.university = "University is invalid";
  }

  // password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  // password2
  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }

  // we are ready to check with the server
  if (Object.keys(errors).length === 0) {
    await axios
      .post("/user/register", {
        email: values.email,
        university: universities[values.university],
        password: values.password,
      })
      .catch((err) => {
        if (err.response.status === 403) {
          errors.global = "The information given is invalid, please try again";
        } else if (err.response.status === 409) {
          errors.email = "The email given already exists!";
        } else if (err.response.status === 500) {
          errors.global = "Server was not able able to process your request";
        } else {
          errors.global = "Unknown error occurred with given input";
        }
      });
  }

  return errors;
}

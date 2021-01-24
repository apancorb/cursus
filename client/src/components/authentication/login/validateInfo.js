import axios from "axios";

export default async function validateInfo(values) {
  let errors = {};

  await axios
    .post(`/user/login`, {
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      console.log("success login", res);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        errors.global = "The information given is invalid, please try again";
      } else if (err.response.status === 404) {
        errors.email = "Email does not exist";
      } else if (err.response.status === 401) {
        errors.password = "Invalid password";
      } else {
        errors.global = "Unknown error occurred with given input";
      }
    });

  return errors;
}

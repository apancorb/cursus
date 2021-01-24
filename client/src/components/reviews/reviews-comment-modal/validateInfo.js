import axios from "axios";

export default async function validateInfo(values) {
  let errors = {};

  if (!values.comment.trim()) {
    errors.description = "Comment required";
  } else if (values.comment.trim().length < 15) {
    errors.comment = "Comment must be 15 characters or more";
  } else if (values.comment.trim().length > 500) {
    errors.comment = "Comment must be less than 500 characters";
  }

  function validURL(str) {
    var pattern = new RegExp(
      "(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?",
      "i"
    ); // fragment locator
    return pattern.test(str);
  }

  if (validURL(values.comment.trim())) {
    errors.comment = "Comment must not include URLs";
  }

  if (Object.keys(errors).length === 0) {
    await axios
      .post(`/reviews/create/comment`, {
        reviewID: values.reviewID,
        comment: values.comment,
      })
      .then((res) => {
        console.log("success comment post");
      })
      .catch((err) => {
        errors.global = "Unknown error occurred with given input";
      });
  }

  return errors;
}

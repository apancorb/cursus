import axios from "axios";

const gradesMapping = {
  "A+": 100,
  A: 96,
  "A-": 93,
  "B+": 89,
  B: 85,
  "B-": 83,
  "C+": 79,
  C: 75,
  "C-": 73,
  "D+": 69,
  D: 65,
  "D-": 63,
  F: 50,
  None: null,
  Dropped: null,
  Other: null,
};

const expMapping = {
  Excellent: 5,
  Good: 4,
  Normal: 3,
  Bad: 2,
  Awful: 1,
  None: null,
};

export default async function validateInfo(values) {
  let errors = {};

  if (!values.classID.trim()) {
    errors.classID = "Class ID required";
  }

  if (!values.className.trim()) {
    errors.className = "Class name required";
  }

  if (!values.profName.trim()) {
    errors.profName = "Instructor's name required";
  }

  if (!values.title.trim()) {
    errors.title = "Title required";
  } else if (values.title.trim().length < 6) {
    errors.title = "Title must be 6 characters or more";
  }

  if (!values.description.trim()) {
    errors.description = "Review required";
  } else if (values.description.trim().length < 15) {
    errors.description = "Review must be 15 characters or more";
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

  if (validURL(values.description.trim())) {
    errors.description = "Review must not include URLs";
  }

  if (Object.keys(errors).length === 0) {
    await axios
      .post(`/reviews/create/review`, {
        classID: values.classID,
        className: values.className,
        profName: values.profName,
        title: values.title,
        description: values.description,
        grade: values.grade,
        gradeNum: gradesMapping[values.grade],
        classExp: values.classExp,
        classExpNum: expMapping[values.classExp],
        profExp: values.profExp,
        profExpNum: expMapping[values.profExp],
      })
      .catch((err) => {
        errors.global = "Unknown error occurred with given input";
      });
  }

  return errors;
}

import { PythonShell } from "python-shell";

const arr = ["umd"];
let i = -1;

setInterval(function () {
  if (i === arr.length - 1) {
    i = 0;
  } else {
    i += 1;
  }

  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "./web-scraping/",
    args: [arr[i]], // An argument which can be accessed in the script using sys.argv[1]
  };

  console.log("STARTING: ", arr[i]);
  PythonShell.run("main.py", options, function (err, result) {
    if (err) {
      console.log("FAILURE: ", arr[i]);
      console.log(err);
    } else {
      // result is an array consisting of messages collected
      //during execution of script.
      /*   for (rs in result) {
              console.log(rs);
          } */
      console.log("result: %j", result);
    }
  });
}, 70000);

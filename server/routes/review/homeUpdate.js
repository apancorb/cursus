import ClassHome from "./../../models/ClassHome.js";
import ProfHome from "./../../models/ProfHome.js";

// class home update
export async function classHomeUpdate(req) {
  try {
    const classHomeDoc = await ClassHome.find({
      university: req.user.university,
      classID: req.body.classID,
    });
    if (classHomeDoc.length === 0) {
      const newClassHomeDoc = new ClassHome({
        university: req.user.university,
        classID: req.body.classID,
        className: req.body.className,
        classExp: req.body.classExpNum,
      });
      const savedNewClassHomeDoc = await newClassHomeDoc.save();
    } else {
      const updatedClassHomeDoc = await ClassHome.updateOne(
        { university: req.user.university, classID: req.body.classID },
        {
          $set: { classExp: classHomeDoc[0].classExp + req.body.classExpNum },
        }
      );
    }
  } catch (err) {
    console.log("A class home update error occurred");
  }
}

// prof home update
export async function profHomeUpdate(req) {
  try {
    const profHomeDoc = await ProfHome.find({
      university: req.user.university,
      profName: req.body.profName,
    });
    if (profHomeDoc.length === 0) {
      const newProfHomeDoc = new ProfHome({
        university: req.user.university,
        profName: req.body.profName,
        profExp: req.body.profExpNum,
      });
      const savedNewProfHomeDoc = await newProfHomeDoc.save();
    } else {
      const updatedProfHomeDoc = await ProfHome.updateOne(
        { university: req.user.university, profName: req.body.profName },
        {
          $set: { profExp: profHomeDoc[0].profExp + req.body.profExpNum },
        }
      );
    }
  } catch (err) {
    console.log("A prof home error update occurred");
  }
}

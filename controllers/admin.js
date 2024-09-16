import TryCatch from "../middlewares/TryCatch.js";
import { Events } from "../models/Events.js";
import fs, { rm } from "fs";
import { promisify } from "util";
import { User } from "../models/User.js";

export const createEvent = TryCatch(async (req, res) => {
  const { title, description, price, members,time, venue, category, createdBy} = req.body;

  const image = req.file;

  await Events.create({
    title,
    description,
    price,
    members,
    time,
    venue,
    category,
    createdBy,
    image: image?.path,
  });

  res.status(201).json({
    message: "Course Created Successfully",
  });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteEvent = TryCatch(async (req, res) => {
  const event = await Events.findById(req.params.id);

//   const lectures = await Lecture.find({ course: course._id });

//   await Promise.all(
//     lectures.map(async (lecture) => {
//       await unlinkAsync(lecture.video);
//       console.log("video deleted");
//     })
//   );

  rm(event.image, () => {
    console.log("image deleted");
  });

//   await Lecture.find({ course: req.params.id }).deleteMany();

  await event.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course Deleted",
  });
});
import TryCatch from "../middlewares/TryCatch.js";
import { Events } from "../models/Events.js";
import { Merchandise } from "../models/Merchandise.js";
import { User } from "../models/User.js";
import sendMail from '../middlewares/sendEventMail.js';

export const getAllMerch = TryCatch(async (req, res) => {
    const merchs = await Merchandise.find();
    res.json({
        merchs
    });
});

export const getSingleMerch = TryCatch(async (req, res) => {
    const merch = await Merchandise.findById(req.params.id);

    res.json({
        merch,
    })
})

export const getMyMerchs = TryCatch(async (req, res) => {
    const merchs = await Merchandise.find({ _id: req.user.subscription });

    res.json({
        merchs,
    })
})

export const checkoutMerch = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const event = await Merchandise.findById(req.params.id);
  if (!event) {
    return res.status(404).json({
      message: "Merch not found",
    });
  }

  if (user.merch.includes(event._id)) {
    return res.status(400).json({
      message: "You already have this Merch",
    });
  }

  // Add the event to the user's merch list
  user.merch.push(event._id);
  await user.save();  // Don't forget to save the updated user data

  // Send the email after successful registration
  await sendMail(user.email, 'Merchandise Purchase Confirmation', {
    name: user.name,
    merch: event.name,  // Assuming 'event.name' is the name of the event
  });

  // Respond with success
  res.status(200).json({
    message: "Event Purchased Successfully",
  });
});
import TryCatch from "../middlewares/TryCatch.js";
import { Events } from "../models/Events.js";
import { User } from "../models/User.js";
import crypto from "crypto";

export const getAllEvents = TryCatch(async (req, res) => {
    const events = await Events.find();
    res.json({
        events
    });
});

export const getSingleEvent = TryCatch(async (req, res) => {
    const event = await Events.findById(req.params.id);

    res.json({
        event,
    })
})

export const getMyEvents = TryCatch(async (req, res) => {
    const events = await Events.find({ _id: req.user.subscription });

    res.json({
        events,
    })
})

import sendMail from '../middlewares/sendEventMail.js'; // Import the sendMail function

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const event = await Events.findById(req.params.id);
  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  if (user.subscription.includes(event._id)) {
    return res.status(400).json({
      message: "You have already subscribed to this event",
    });
  }

  // Add the event to the user's subscription list
  user.subscription.push(event._id);
  await user.save();  // Don't forget to save the updated user data

  // Send the email after successful registration
  await sendMail(user.email, 'Event Registration Confirmation', {
    name: user.name,
    title: event.title,  // Assuming 'event.name' is the name of the event
  });

  // Respond with success
  res.status(200).json({
    message: "Event Purchased Successfully",
  });
});

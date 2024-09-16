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
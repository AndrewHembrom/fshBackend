import TryCatch from "../middlewares/TryCatch.js";
import { Events } from "../models/Events.js";
import { Merchandise } from "../models/Merchandise.js";

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
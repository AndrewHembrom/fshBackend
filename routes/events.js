import express from "express";
import { getAllEvents, getSingleEvent, getMyEvents } from "../controllers/events.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/event/all", getAllEvents);
router.get("/event/:id", getSingleEvent);
router.get("/myevents", isAuth, getMyEvents);

export default router;

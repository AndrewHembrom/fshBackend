import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { createEvent, deleteEvent } from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/event/new", isAuth, isAdmin, uploadFiles, createEvent);
router.delete("/event/:id", isAuth, isAdmin, deleteEvent);

export default router;
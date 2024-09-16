import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import { createEvent, deleteEvent , getAllStats, createMerch} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/event/new", isAuth, isAdmin, uploadFiles, createEvent);
router.post("/event/new", isAuth, isAdmin, uploadFiles, createMerch);
router.delete("/event/:id", isAuth, isAdmin, deleteEvent);
router.get("/stats", isAuth, isAdmin, getAllStats);

export default router;
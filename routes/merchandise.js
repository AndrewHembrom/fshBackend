import express from "express";
import { getAllMerch, getSingleMerch, getMyMerchs } from "../controllers/merchandise";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

router.get("/merch/all", getAllMerch);
router.get("/merch/:id", getSingleMerch);
router.get("/mymerchs", isAuth, getMyMerchs);

export default router;
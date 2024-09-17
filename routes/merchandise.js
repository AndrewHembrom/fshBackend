import express from "express";
import { getAllMerch, getSingleMerch, getMyMerchs, checkoutMerch } from "../controllers/merchandise.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/merch/all", getAllMerch);
router.get("/merch/:id", getSingleMerch);
router.get("/mymerchs", isAuth, getMyMerchs);
router.get("/merch/checkout/:id", isAuth, checkoutMerch);

export default router;
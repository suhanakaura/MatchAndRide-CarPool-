import express from "express";
import { driver } from "../controllers/driver.controller.js";
import verifyRoute from "../middlewares/verifyRoute.js"
const router=express.Router();

router.get("/fetch-rider-detail",verifyRoute,driver)

export default router;
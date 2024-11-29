import express from "express";
import { driver } from "../controllers/driver.controller.js";
const router=express.Router();

router.get("/fetch-rider-detail",driver)

export default router;
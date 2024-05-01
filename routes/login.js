import { Router } from "express";
import { adminLogin, staffLogin } from "../controllers/login.js";
const router = new Router()
router.post('/adminLogin', adminLogin)
router.post('/staffLogin', staffLogin)
export default router;
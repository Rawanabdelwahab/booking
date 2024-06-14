import { Router } from "express";
import { appointmentBooking } from "../controllers/booking.js";
const router = new Router();
router.post("/appointmentBooking", appointmentBooking);
export default router;

import { Router } from "express";
import { post, edit, deleteOne ,getWorkingHoursOfWeek} from "../controllers/workingHours.js";
import { slot } from "../middlewares/errorMiddleware.js";
const router = new Router()
router.post('/workingHours', slot, post)
router.put('/workingHours/:id',slot, edit)
router.delete('/workingHours/:id', deleteOne)
router.get('/working-hours-of-week', getWorkingHoursOfWeek);
export default router;
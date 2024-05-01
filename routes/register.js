import { Router } from "express"
import { get, registerAdmin, registerStaff } from "../controllers/register.js"
const router = new Router()
router.post('/registerAdmin', registerAdmin)
router.post('/registerStaff/:id', registerStaff)
router.get('/register',get)
export default router
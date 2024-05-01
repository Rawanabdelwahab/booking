import { Schema, model } from "mongoose";
import { roles } from '../utils/enums.js'
const login = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
       // unique:true
    },
    password: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [roles.admin, roles.staff, roles.user],
        default: roles.admin
    },

},
    { timestamps: true }
)
export default model('login', login)
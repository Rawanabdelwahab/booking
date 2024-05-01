import userModel from '../models/login.js'
import staffModel from '../models/staff.js'
import bcrypt from "bcrypt"
import { roles } from '../utils/enums.js'
export const registerAdmin = async (req, res) => {
    const { firstName, lastName, password, emailAddress, role, companyName, businessType } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    const x = await userModel.create({ firstName, lastName, emailAddress, password: encryptedPassword, role: roles.admin, companyName, businessType })

    res.json()
}
export const registerStaff = async (req, res) => {
   // const id = req.params.id
    const { adminId,firstName, lastName, password, emailAddress, role, companyName, businessType } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    const x = await staffModel.create({ adminId,firstName, lastName, emailAddress, password: encryptedPassword, role: roles.staff, companyName, businessType })
    res.json()
}

export const get = async (req, res) => {
    const find = await userModel.find({}).select('_id').lean()
    const myArray = find.map(obj => `${obj._id}`);
    const baseURL = 'http://localhost:3000/registerStaff/';
    const modifiedURLs = myArray.map(id => baseURL + id);

    console.log(modifiedURLs);
    // console.log(myArray)
    res.json(myArray)
}
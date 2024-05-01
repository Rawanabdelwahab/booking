import loginModel from "../models/login.js";
import staffModel from "../models/staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
        const logged = await loginModel.findOne({ emailAddress });

        if (!logged) {
            // If no user is found, return an error response
            return res.status(404).json({ found: false });
        }

        // If user is found, compare passwords
        const isCorrectPassword = bcrypt.compareSync(password, logged.password);

        if (!isCorrectPassword) {
            // If password doesn't match, return an error response
            return res.status(401).json({ message: "Invalid password" });
        }

        // If password matches, generate JWT token
        const data = {
            _id: logged._id,
            emailAddress: logged.emailAddress
        };
        const token = jwt.sign(data, 'shhhhh');

        // Return token in response
        res.json({ token });
    } catch (error) {
        // Handle any other errors
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const staffLogin = async (req, res) => {
    const { emailAddress, password } = req.body;

    try {
        const logged = await staffModel.findOne({ emailAddress });

        if (!logged) {
            // If no user is found, return an error response
            return res.status(404).json({ found: false });
        }

        // If user is found, compare passwords
        const isCorrectPassword = bcrypt.compareSync(password, logged.password);

        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const data = {
            _id: logged._id,
            emailAddress: logged.emailAddress
        };
        const token = jwt.sign(data, 'shhhhh');
        res.json({ token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
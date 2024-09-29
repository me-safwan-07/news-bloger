import express from "express";
import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
export const createAdmin = async () => {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const admin = new Admin({email: process.env.ADMIN_EMAIL, password: hashedPassword});
        await admin.save();
    }
}

createAdmin();

router.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});

    if(!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(401).json({ message: 'Invalid password'});
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({ token });
});

export default router;
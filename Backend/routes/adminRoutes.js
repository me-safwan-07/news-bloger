import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/login', async (req, res) => {
    const {email, password} = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ id: "1" }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token });
    };

    return res.status(400).json({ message: 'Admin credentials are incorrect' });
    
});

export default router;
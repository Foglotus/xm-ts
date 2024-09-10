import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../services/user.service.js';
import { md5 } from '../tools/crypt.js';
import { SECRET } from '../config.js';


export const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [_err, user] = await getUserByUsername(username);
    if (user) {
        // md5对比
        const md5Password = md5(password);
        if (md5Password === user.password) {
            const token = jwt.sign({ username: user.username, role: user.role, id: user.id, permit: user.permit }, SECRET, { expiresIn: '24h' });
            res.json({code: 0, data: {
                token, id: user.id, role: user.role, name: user.name, username: user.username, permit: user.permit
            } });
        } else {
            res.json({ code: 401, message: 'Invalid password' });
        }
    } else {
        res.json({code: 401,  message: 'Invalid username' });
    }
});
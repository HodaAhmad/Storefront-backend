/*import express, {Request, Response} from 'express';
//@ts-ignore
import jwt from 'jsonwebtoken';

// Create token Validator middleware

const authenticateToken = (req: Request, res: Response, next: () => void) => {
    try {
        if (process.env.TOKEN_SECRET) {
            const authorizeHeader= (req.headers.authorization as unknown) as string;
            const token = authorizeHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            next()
        }

    } catch (error) {
        res.status(401);
        res.json('invalid token');
    }
}
export default authenticateToken;
*/
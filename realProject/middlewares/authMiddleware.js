import jwt from "jsonwebtoken";
import { blacklistToken } from "../controllers/userController.js";

export function verifyToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        next({
            status: 401,
            message: "authorization header is missing"
        });
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        next({
            status: 401,
            message: "invalid authorization header format"
        });
    }
    const token = parts[1];

    if(blacklistToken.includes(token)){
         return next({
            status : 401,
            message:"token is expired or logged out"
        })
    };
    
       

    jwt.verify(token, "mysecretkey", (err, decoded) => {
        if (err) {
            next({
                status: 401,
                message: "invalid or expired token"
            })
        }

        req.user = decoded;
        next();
    })
}
export default verifyToken
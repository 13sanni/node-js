import jwt from 'jsonwebtoken';
import {refresh}  from './userController.js';
export function refreshAccessToken(req, res, next) {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        return next({
            status: 400,
            message: "refresh token is missing"
        });
    }
   
    if (!refresh.includes(refreshToken)) {
        return next({
            status: 403,
            message: "invalid refresh token"
        })
    }
    jwt.verify(refreshToken, "myrefreshsecret", (err, decoded) => {
        if (err) {
            return next({
                status: 403,
                message: "invalid or expired refresh token"
            });
        }
        jwt.sign({ email: decoded.email, role: "user" }, 'mysecretkey', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return next({
                    status: 500,
                    message: "error generating access token"
                });
            }
            res.status(200).json({
                success: true,
                message: "access token refreshed successfully",
                token: token
            });
        });
    });
}
export default refreshAccessToken;
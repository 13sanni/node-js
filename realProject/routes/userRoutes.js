import { createUser, loginUser, logoutUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import refreshAccessToken from "../controllers/refreshAccessController.js";
import { Router } from "express";
import requireAdmin from "../middlewares/roleMiddleware.js";
import { registerUserSchema,loginUserSchema } from "../validators/userValidator.js";
import validate from "../middlewares/validate.js";
import { loginRateLimiter } from "../middlewares/rateLimit.js";
const router = Router();

router.post("/",validate(registerUserSchema) ,createUser);

router.post("/login",loginRateLimiter,validate(loginUserSchema) ,loginUser);

router.post("/refresh", refreshAccessToken)

router.post("/logout", logoutUser)

router.get("/profile", verifyToken, (req, res) => {
    res.status(200).send({
        success: true,
        message: "user profile data",
    
        user: req.user
    });
});


router.get("/adminpanel", verifyToken, requireAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to admin panel"
    });
})




export default router;
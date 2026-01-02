import {createUser,loginUser} from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

import { Router } from "express";
import requireAdmin from "../middlewares/roleMiddleware.js";
const router = Router();
 router.post("/", createUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, (req, res) => {
    res.status(200).send({
        success: true,
        message: "user profile data",
        user : req.user
    });
});
router.get("/adminpanel", verifyToken,requireAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to admin panel"
    });
})


export default router;
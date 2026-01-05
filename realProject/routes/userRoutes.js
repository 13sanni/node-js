import { createUser, loginUser, logoutUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import refreshAccessToken from "../controllers/refreshAccessController.js";
import { Router } from "express";
import requireAdmin from "../middlewares/roleMiddleware.js";
import { registerUserSchema, loginUserSchema } from "../validators/userValidator.js";
import validate from "../middlewares/validate.js";
import { loginRateLimiter } from "../middlewares/rateLimit.js";
import upload from "../middlewares/upload.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
const router = Router();


router.post("/upload/cloud", upload.single("avatar"), async (req, res, next) => {
  try {
    if (!req.file) {
      return next({
        status: 400,
        message: "no file provided"
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (err) {
    next(err);  
  }
});


router.post("/upload/multiple", upload.array("photos", 5), (req, res, next) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return next({
      status: 400,
      message: "no files found"
    });
  }

  const uploaded = files.map(file => ({
    filename: file.filename,
    path: file.path
  }));

  res.status(200).json({
    success: true,
    files: uploaded
  });
});

router.post("/upload", upload.single("avatar"), (req, res, next) => {
    let file = req.file
    if (!file) {
        return next({
            status: 401,
            message: "no file found"
        })
    }
    res.status(200).send({
        success: true,
        fileName: file.filename,
        path: file.path

    })
})
router.post("/", validate(registerUserSchema), createUser);

router.post("/login", loginRateLimiter, validate(loginUserSchema), loginUser);

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
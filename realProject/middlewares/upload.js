import multer from "multer";
/* 
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },

  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
}); */

const storage = multer.memoryStorage({

    filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

function fileFilter(req, file, cb) {
  // allow only images
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // reject
  cb(new Error("Only image files are allowed"));
}

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});

export default upload;

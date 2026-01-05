import cloudinary from "../config/cloudinaryConfig.js";

export function uploadtocloudinary(buffer){
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
             { folder: "uploads" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
        )
            stream.end(buffer);
    })
}
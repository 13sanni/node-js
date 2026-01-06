import cloudinary from "../config/cloudinaryConfig.js";

export function deletefromcloudinary(publicId){
    return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId,(err,result)=>{
     if(err){
        return reject(err)
     }
        resolve(result)
    })
}
    )

}
export default deletefromcloudinary
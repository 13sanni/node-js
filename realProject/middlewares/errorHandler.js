


export function errorHandler(err, req, res, next) {
    const statusCode = err?.status || 500;

    if(err.name == "MulterError"){
    
            res.status(400).json({success:false,message:"file size or file count exceed the limit"})
        
    }
         

     else if (err?.message?.startsWith("Only")){
     res.status(400).json({success:false,message:"Bad file type"})
 } 
 else{

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}}

export default errorHandler;
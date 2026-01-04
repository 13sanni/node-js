
export function validate(schema){
    return (req,res,next)=>{


const result = schema.safeParse(req.body);



    if(!result.success){
        return next({
            status:401,
            message:result.error.errors[0].message
        })
    }
  req.body = result.data
next();
} 

}

export default validate
import jwt from 'jsonwebtoken';
import bcrypt  from 'bcrypt';
import { User } from '../models/userModel.js';

// arry for storing token
export let refresh = [""];
export let blacklistToken = [""]

export async function createUser(req, res, next) {

    let body = req.body;
    if (!body?.name || !body?.email || !body?.password) {
        return next({
            status: 400,
            message: "name, email, or password missing"
        });
    }


    //hashing password
    const hashPassword = await bcrypt.hash(body.password, 10);


    const user = await User.create({
        name: body.name,
        password: hashPassword,
        email: body.email
    }
    )

    res.status(201).json({
        success: true,
        message: "user created successfully",
        user: {
            userId: user.id,
            name: user.name,
            email: user.email,
        }
    })

}




//login user
export async function loginUser(req, res, next) {

    const body = req.body;

    const user = await User.findOne({ email: body.email })
    if (!user) {
        return next({
            status: 400,
            message: "no user found"
        })

    }


    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
        return next({
            status: 401,
            message: "invalid credentials"
        });
    }



    return generateToken(body.email, res, next);


}

//logout controller 

export function logoutUser (req,res,next){
    let header = req.headers.authorization;
    if(!header){
        return next({
            status :400,
            message : "please provide a token"
        })
    }
   let part = header.split(" ")
    if(part.length!==2||part[0]!=="Bearer"){
        return next({
            statsus:401,
            message :"invalid token"
        })
    }
    let token=part[1]
    blacklistToken.push(token)
    res.status(201).json(
        {
            success:true,
            message:"logout succesfully"
        }
    )

}

//json web token


export function generateToken(email, res, next) {
    let refreshToken = jwt.sign({ email }, "myrefreshsecret", { expiresIn: '7d' })

    let token = jwt.sign({ email, role: "user" }, 'mysecretkey', { expiresIn: '1h' })
    refresh.push(refreshToken);
    res.status(200).json({
        success: true,
        message: "login successful",
        refreshToken: refreshToken,
        token: token
    })
}

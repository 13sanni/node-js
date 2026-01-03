import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';






let users = [];

export async function createUser(req, res, next) {

    // validate request body
    let body = req.body;

  if (!body ||!body?.email || !body?.password || !body?.name) {
    return next({
      status: 400,
      message: "name, email or password is missing"
    });
  }
    
    //pushing user to array
    const hashPassword =await bcrypt.hash(body.password, 10);
    users.push({ email: body.email, password: hashPassword });


    res.status(201).send({
        success: true,
        message: "user created successfully",
        user: {
            email: body.email,
            name: body.name
        }


    });
};




//login user
export  async function loginUser (req, res, next) {

    const body = req.body;
  
    if (!body || !body.email || !body.password) {
        return next({
            status: 400,
            message: "email or password is missing"
        });
    }

    let user = users.find(u => u.email === body.email);
    if (!user) {
        return next({
            status: 401,
            message: "invalid credentials"
        })
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
        return next({
            status: 401,
            message: "invalid credentials"
        })
    }


    return generateToken(body.email, res, next);


}

//json web token
export let refresh = [""];


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

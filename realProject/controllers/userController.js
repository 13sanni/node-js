import jwt from 'jsonwebtoken';
export function createUser(req, res, next) {

    // validate request body
    let body = req.body;
    if (!body) {
        return (
            res.status(400).send({ message: "body is missing" })
        );
    }
    if (!body.name) {
        return next({
            status: 400,
            message: "name is missing"
        })

    }
    if (!body.age) {
        return (
            res.status(400).send({ message: "age is missing" })
        )
    }
    res.status(201).send({
        success: true,
        message: "user created successfully",
        user: {
            name: body.name,
            age: body.age
        }


    });
};

//fake user
let users = [{ email: "user1@gmail.com", password: "user123" }, { email: "user2@gmail.com.com", password: "user123" }];


//login user
export function loginUser(req, res, next) {

    const body = req.body;
    let foundUser = false;
    if (!body || !body.email || !body.password) {
        return next({
            status: 400,
            message: "email or password is missing"
        });
    }

    for (let user of users) {
        if (user.email === body.email && user.password === body.password) {
            foundUser = true;
            break;
        }
    }
    if (!foundUser) {
        return next({
            status: 401,
            message: "invalid credentials"
        })
    }
    
        return generateToken(body.email, res, next);
    
        
}

//json web token

export function generateToken(email, res, next) {
       
    jwt.sign({email,role:"user"}, 'mysecretkey', {expiresIn: '1h'},(err, token) => {
        if(err){
            return next({
                status: 500,
                message: "error generating token"
            });
        }
        res.status(200).json({
            success: true,
            message: "login successfull",
            token: token
            })
        }
)}
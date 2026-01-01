import express from 'express';
const app = express();
const port =3000;

//middleware
app.use(express.json())

// route
app.get('/',(req,res)=>{ 
    res.send('welcome to landing page')
})

// params
app.get('/users/:id',(req,res)=>{
    const userId = req.params.id;
    res.send(`user id is ${userId}`)
})

// query
 app.get('/search',(req,res)=>{ 
    let {q} = req.query
    if(q){
    res.send(`you search for ${q}`)
}else{
    res.send('no query found')     
}})

//post request , receive data from client

app.post('/user',(req,res)=>{
    const userData = req.body;
    if(userData && userData.name&& userData.age){
    res.status(201).json({
  "success": true,
  "message": "User created successfully",
  "user": {
    "name": userData.name,
    "age": userData.age
  }
}
)
}
else{res.status(400).json({
  "success": false,
  "message": "Please provide name and age"
}
) }
})

//listen
app.listen(port , ()=>{
    console.log("app is running on port "+ port) })
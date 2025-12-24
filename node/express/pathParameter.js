// path parameters are basically the parameter we get after a / mean if the whole path is http//localhost3000/hello
// so hello is a parameter 3000/hello/233 is also a parameter we can fecth this usi]ng req.params

const express =  require ("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send("hey there")
})


app.get('/:username/:id',(req,res)=>{
    console.log(req.params)
    let {username , id } = req.params
res.send(`hey ${username} your id is ${id}`)
    // here username and id are not path they are variable so if your path contain parameter means if thre is sonthing 
    // written after 3000/ for eg if thre is 3000/hero/12 then it bacomes username stores the value hero
    // this part /:username/:id is also part of url it known as dynamic path 
})

app.listen(port,()=>{
    console.log ("app is running or port 3000")
})
 
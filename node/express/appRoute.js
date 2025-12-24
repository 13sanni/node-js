const express = require('express');
const app = express();
const port =3000;
// routing is path for a request  used to provide response based on path 
// each path can proivde a single response of same type of request 

//request has types like get put delete post etc

app.get('/',(req,res)=>{ //   '/'  is consider as a root path so when ever some body type http://localhost:3000/
    //and the type of req is ger then it will get this response    get is adefault type of req
    res.send("welcome to landing page")
})

app.get('/page1',(req,res)=>{
    res.send('welcome to page 1')// if path is http://localhost:3000/page1  then this response is send 

})
// we can change the resposne on based of type and keep the path name same

app.post('/',(req,res)=>{
    res.send('this is a post request') // the path is same as above but the type of req is different so this
    // resposne will be send 
})

// this * is used for path which is not made of presend but you want send a customm resposne for that


app.listen(port , ()=>{
    console.log("app is running")
})

// the differnce btw app.use and these specefic method that app.use listion to every type of req ,so if you use app.use
// for a specific route you will be able to send only one response for any type of req on that routes.
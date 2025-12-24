const express = require('express');

// geting a req
const app = express();
port = 3000;
app.use((req,res)=>{
    console.log("req recieved") // .use is a method to  to listen each req which is coming on server 
//when ever a req wil come  server it will print req recieved on console
})

app.listen(port , ()=>{
    console.log("app is running")

})
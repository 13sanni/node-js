const express = require('express');
const app = express();
const port =3000;

// after the path /seach?q=  after ?q= the word written after q= is query not only the word it can be more then a single word 
// eg ?q=apple&color:green

//fecth query  = req.query
app.get('/search',(req,res)=>{ 
    let {q} = req.query
    res.send(`welcome to landing page and you search for ${q}`)
})



app.listen(port , ()=>{
    console.log("app is running")
})


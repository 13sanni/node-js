const express = require('express');

const app = express();
port = 3000;
app.use((req,res)=>{
    console.log("req recieved") 
    // we can send respone in diffrent formats like text html or json 
    // a request is sended in a text format but express parse it into json by default  if you console log a req
    //it will show data in json forrmat  


    // sending a response

    //res.send('hii there ! this is a response ')// this is a text format res




    //html format
  //  let code = `<h1> FRUITS<h1>
    //<ul> 
    //<li> ORAGNE </li>
    //<li>MANGO</li>
    //</ul>`
    //res.send(code)



    res.send({
        name:"sunny",  //json format
        age:"23",
    })
})

app.listen(port , ()=>{
    console.log("app is running")

})
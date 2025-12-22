const http = require('http')// using a module http which is used to get a request or send a response
/* 
function requestListener (req,res)//here req and res are two parameters 
{
    console.log(req)
}
http.createServer(requestListener); // using a createServer function of http module 


//the shorter way, using a arrow function ||   now server is created this will return a object 
const server = http.createServer((req,res)=> //we are storing the object in server variable
    {
    console.log (req);
})
// we we want server to listen means it should be active as any req is coming or not ..

server.listen(3000)// now this 3000 is a port at which  req will come 



 */

//  now in a better way


const PORT = 3000;
const server = http.createServer((req,res)=>{
    console.log(req)
})

server.listen(PORT,()=>{
    console.log(`server running on port :${PORT}`)
})
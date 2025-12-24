
const http = require('http')
const PORT = 3000;
const server = http.createServer((req,res)=>{
    if(req.url===('/')){
    res.setHeader('Content-Type','text/html')
   
     res.write(`<a href="http://localhost:3000/">home</a> </br>
     <a href="http://localhost:3000/men">men</a> </br> <a href="http://localhost:3000/women">women</a>`)  
   
    return res.end();
} else if(req.url.toLocaleLowerCase()===('/men')){
     res.setHeader('Content-Type','text/html')
    res.write('<h1>hello men</h1>')
    return res.end();
}
else if(req.url.toLocaleLowerCase()===('/women'))
  res.setHeader('Content-Type','text/html')
     res.write('<h1>hello women</h1>')
    return res.end();
}
)


server.listen(PORT,()=>{
    console.log(`server running on port :${PORT}`)
})
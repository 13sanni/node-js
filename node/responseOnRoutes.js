
const http = require('http')
const PORT = 3000;
const server = http.createServer((req,res)=>{
    if(req.url==='/page0'){
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
     res.write('<body><h1> HEllo js</h1></body>')  
       
    res.write('</html>')
    return res.end();}
    else if(req.url==='/page1'){
         res.setHeader('Content-Type','text/html')
    res.write('<html>')
     res.write('<body><h1> Page 1</h1></body>')  
       
    res.write('</html>')
    return res.end();}
     res.setHeader('Content-Type','text/html')
    res.write('<html>')
     res.write('<body><h1> home page</h1></body>')  
       
    res.write('</html>')
    return res.end();}

    )

server.listen(PORT,()=>{
    console.log(`server running on port :${PORT}`)
})
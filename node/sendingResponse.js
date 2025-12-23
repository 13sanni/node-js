
const http = require('http')
const PORT = 3000;
const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
     res.write('<body><h1> HEllo js</h1></body>')  
       
    res.write('</html>')
    return res.end();
})

server.listen(PORT,()=>{
    console.log(`server running on port :${PORT}`)
})
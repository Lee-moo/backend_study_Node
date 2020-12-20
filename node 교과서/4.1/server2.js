const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
  .listen(8080, ()=>{
      console.log('8080 port');
  });
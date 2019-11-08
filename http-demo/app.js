const http = require('http')
const users = require('./data');

const server = http.createServer((req,res)=>{

    console.log("request =" + req);
    if(req.url === '/'){
        //console.log("request =" + req);
        res.write("Hello World !");
        //res.end();
    }
    if(req.url === '/users'){

        if(req.method ==  "GET" ){
        res.writeHead(201,'application/json');
        res.write(JSON.stringify(users))
        }
        if(req.method == "POST"){
            res.writeHead(201,'application/text');
            res.write("user created ")
        }
        
    }
    res.end();
   

});
const port = process.env.PORT || 2131;

server.listen(port,()=>{ 
    console.log("api server started on port "+ port);
})
import  calculator  from "./calculator";

import express from "express";

const server = express();
server.get('/*',(req,res)=>{
    console.log(req.url);
    res.status(200).end("Hello World Typescript");
});

server.listen(3000,()=>{
    console.log("Server is listening to 3000");
});

const c = new calculator();
console.log(c.power(2,10));

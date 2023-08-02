import express from "express";
import employee_router from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import dataSource from "./data-source";

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employee_router);

server.get('/*',(req,res)=>{
    console.log(req.url);
    res.status(200).send("Hello World Typescript");
});

(async ()=>{
    await dataSource.initialize();
    server.listen(3000,()=>{
    console.log("Server is listening to 3000");
    })
})();



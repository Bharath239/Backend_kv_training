import express from "express";
import Employee from "./employee";

const employee_router = express.Router();
let count =2;
const employees: Employee[]=[
    {
        id:1,
        name:"Jithin",
        email:"jithin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id:2,
        name:"Vaishnav",
        email:"vaishnav@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

employee_router.get('/',(req,res)=>{
    console.log(req.url);
    res.status(200).send(employees);
});

employee_router.get('/:id',(req,res)=>{
    console.log(req.url);
    res.status(200).send(employees.find(element=>element.id===parseInt(req.params.id)));
});

employee_router.post('/',(req,res)=>{
    console.log(req.url);
    const newemployee = new Employee();
    newemployee.id = ++count;
    newemployee.name = req.body.name;
    newemployee.email = req.body.email;
    newemployee.createdAt = new Date();
    newemployee.updatedAt = new Date();
    employees.push(newemployee);
    res.status(201).send(newemployee);
});

employee_router.patch('/:id',(req,res)=>{
    console.log(req.url);
    const employee = employees.find(element=>element.id===parseInt(req.params.id));
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    res.status(201).send("employee patched");
});

employee_router.put('/:id',(req,res)=>{
    console.log(req.url);
    const employee = employees.find(element=>element.id===parseInt(req.params.id));
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    res.status(201).send(employee);
});

employee_router.delete('/:id',(req,res)=>{
    console.log(req.url);
    employees.splice(employees.findIndex(element=>element.id===parseInt(req.params.id)),1);
    res.status(201).send("Deleted");
});

export default employee_router;


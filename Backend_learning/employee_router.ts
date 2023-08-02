import express from "express";
import Employee from "./employee";
import dataSource from "./data-source";

const employee_router = express.Router();
const employees: Employee[]=[];

employee_router.get('/',async (req,res)=>{
    // const nameFilter = req.query.name as string || "";
    // const emailFilter = req.query.email  as string || "";
    const nameFilter = req.query.name as string;
    const emailFilter = req.query.email  as string;
    // const filters: FindOptionsWhere<Employee> = {};
    // if(nameFilter) {
    //     filters.name = Like(`${nameFilter}%`);
    // }
    // if(emailFilter) {
    //     filters.email = Like(`${emailFilter}%`);
    // }
    const employeeRepository =  dataSource.getRepository(Employee);
    const qb = employeeRepository.createQueryBuilder();
    if(nameFilter){
        qb.andWhere("name LIKE :somename",{somename: `${nameFilter}%`});
    }
    if(emailFilter){
        qb.andWhere("email LIKE :someemail",{someemail: `%${emailFilter}`});
    }
    // const employees = await employeeRepository.find({
    //     where: filters
    // });
    // const employees = await employeeRepository.find({
    //     where: {
    //         name: Like(nameFilter + "%"),
    //         email: Like(emailFilter + "%")
    //     }
    // });
    const employees = await qb.getMany();
    console.log(req.url);
    res.status(200).send(employees);
});

employee_router.get('/:id',async (req,res)=>{
    const employeeRepository =  dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    res.status(200).send(employee);
});

employee_router.post('/',async (req,res)=>{
    console.log(req.url);
    const newemployee = new Employee();
    newemployee.name = req.body.name;
    newemployee.email = req.body.email;
    const employeeRepository =  dataSource.getRepository(Employee);
    const savedEmployee = await employeeRepository.save(newemployee);
    res.status(201).send(savedEmployee);
});

employee_router.patch('/:id',(req,res)=>{
    console.log(req.url);
    const employee = employees.find(element=>element.id===parseInt(req.params.id));
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.updatedAt = new Date();
    res.status(200).send("employee patched");
});

employee_router.put('/:id',async (req,res)=>{
    console.log(req.url);
    const employeeRepository =  dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    employee.name = req.body.name;
    employee.email = req.body.email;
    const savedEmployee = await employeeRepository.save(employee);
    res.status(200).send(savedEmployee);
});

employee_router.delete('/:id',async (req,res)=>{
    const employeeRepository =  dataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id: Number(req.params.id),
    });
    const deletedEmployee = await employeeRepository.softRemove(employee);
    console.log(req.url);
    res.status(200).send(deletedEmployee);
});

export default employee_router;


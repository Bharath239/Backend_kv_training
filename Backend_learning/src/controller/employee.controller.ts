import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import CreateEmployeeDto from "../dto/create.employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";

class EmployeeController{
    public router: express.Router;
    
    constructor(private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.delete("/:id",this.deleteEmployeeById);
        this.router.post("/", this.createEmployee);
        this.router.put("/:id",this.putEmployee);
    }

    getAllEmployees = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        }
        catch(error){
            next(error);
        }
    }

    getEmployeeById = async (req: express.Request, res: express.Response, next:NextFunction) => {
        try{
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(employee);
        }catch(error){
            next(error);
        }
        
    }

    deleteEmployeeById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const employeeId = Number(req.params.id);
            await this.employeeService.deleteEmployeeById(employeeId);
            res.status(204).send("Deleted successfully");
        }catch(error){
            next(error);
        }
    }

    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const {name,email,address} = req.body;
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.createEmployee(name,email,address);
            res.status(201).send(employee);
        }
        catch(error){   
            next(error);
        }

    }

    putEmployee = async (req: express.Request, res: express.Response,next: NextFunction) => {
        try{
            const employeeId = Number(req.params.id);
            const {name,email,address} = req.body;
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(createEmployeeDto);
            if(errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.putEmployee(name,email,address,employeeId);
            res.status(201).send(employee);
        }
        catch(error){
            next(error);
        }
        
    }
}

export default EmployeeController;
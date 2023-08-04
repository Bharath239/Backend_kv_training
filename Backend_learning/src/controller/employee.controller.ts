import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import CreateEmployeeDto from "../dto/create.employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";

class EmployeeController{
    public router: express.Router;
    
    constructor(private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get("/", authenticate, this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.delete("/:id",authenticate, authorize ,this.deleteEmployeeById);
        this.router.post("/", authenticate, authorize ,this.createEmployee);
        this.router.put("/:id",authenticate, authorize ,this.putEmployee);
        this.router.post("/login",this.loginEmployee);
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
            const {name,email,address,password,role,age} = req.body;
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.createEmployee(name,email,address,password,role,age);
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

    loginEmployee = async(req: express.Request, res: express.Response, next: NextFunction) => {
        const {email,password} = req.body;

        try{
            const token = await this.employeeService.loginEmployee(email, password);
            res.status(200).send({data: token})
        }catch(error){
            next(error);
        }
    }
}

export default EmployeeController;
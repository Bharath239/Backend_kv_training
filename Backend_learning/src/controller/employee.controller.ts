import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import CreateEmployeeDto from "../dto/create.employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import LoginCredentialsDto from "../dto/login.credential.dto";
import PatchEmployeeDto from "../dto/patch.employee.dto";

class EmployeeController{
    public router: express.Router;
    
    constructor(private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get("/", authenticate, this.getAllEmployees);
        this.router.get("/:id", authenticate, this.getEmployeeById);
        this.router.delete("/:id",authenticate, authorize([Role.HR,Role.ADMIN]),this.deleteEmployeeById);
        this.router.post("/", authenticate, authorize([Role.HR,Role.ADMIN]),this.createEmployee);
        this.router.put("/:id",authenticate, authorize([Role.HR,Role.ADMIN]), this.putEmployee);
        this.router.patch("/:id",authenticate,authorize([Role.HR,Role.ADMIN]),this.patchEmployee);
        this.router.post("/login",this.loginEmployee);
    }

    getAllEmployees = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const employees = await this.employeeService.getAllEmployees();
            res.locals = {
                data: employees,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
            }
        catch(error){
            next(error);
        }
    }

    getEmployeeById = async (req: express.Request, res: express.Response, next:NextFunction) => {
        try{
            const employeeId = parseInt(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.locals = {
                data: employee,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }
        catch(error){
            next(error);
        }
        
    }

    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.createEmployee(createEmployeeDto);
            res.locals = {
                data: employee,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }
        catch(error){   
            next(error);
        }

    }

    putEmployee = async (req: express.Request, res: express.Response,next: NextFunction) => {
        try{
            const employeeId = parseInt(req.params.id);
            const createEmployeeDto = plainToInstance(CreateEmployeeDto,req.body);
            const errors = await validate(createEmployeeDto);
            if(errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.putEmployee(createEmployeeDto,employeeId);
            res.locals = {
                data: employee,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();        
        }
        catch(error){
            next(error);
        }
    }

    patchEmployee = async (req: express.Request, res: express.Response,next: NextFunction) => {
        try{
            const employeeId = parseInt(req.params.id);
            const patchEmployeeDto = plainToInstance(PatchEmployeeDto,req.body);
            const errors = await validate(patchEmployeeDto);
            if(errors.length>0){
                throw new ValidationException(errors);
            }
            const employee = await this.employeeService.patchEmployee(patchEmployeeDto,employeeId);
            res.locals = {
                data: employee,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    deleteEmployeeById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const employeeId = parseInt(req.params.id);
            const employee = await this.employeeService.deleteEmployeeById(employeeId);
            res.locals = {
                data: employee,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    loginEmployee = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const loginCredentialsDto = plainToInstance(LoginCredentialsDto,req.body);
            const errors = await validate(loginCredentialsDto);
            if(errors.length > 0){
                throw new ValidationException(errors);
            }
            const token = await this.employeeService.loginEmployee(loginCredentialsDto);
            res.locals = {
                data: token,
                errors: null,
                message: "OK",
            }   
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }
}

export default EmployeeController;      
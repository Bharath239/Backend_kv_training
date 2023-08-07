import express, { NextFunction } from "express"
import DepartmentService from "../service/department.service";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create.employee.dto";
import { validate } from "class-validator";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import CreateDepartmentDto from "../dto/department.dto";

class DepartmentController{
    public router: express.Router;

    constructor(private departmentService: DepartmentService){
        this.router = express.Router();
        this.router.get("/",authenticate,this.getAllDepartments);
        this.router.get("/:id",authenticate,this.getDepartmentById);
        this.router.post("/",authenticate,authorize([Role.HR,Role.ADMIN]),this.createDepartment);
        this.router.put("/:id",authenticate,authorize([Role.HR,Role.ADMIN]),this.updateDepartment);
        this.router.delete("/:id",authenticate,authorize([Role.HR,Role.ADMIN]),this.deleteDepartment);
    }

    getAllDepartments = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const departments = await this.departmentService.getAllDepartments();
            res.locals = {
                data: departments,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    getDepartmentById = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const departmentId = parseInt(req.params.id);
            const department = await this.departmentService.getDepartmentById(departmentId);
            res.locals = {
                data: department,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    createDepartment = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto,req.body);
            const errors = await validate(createDepartmentDto);
            if(errors.length > 0){
                throw new ValidationException(errors);
            }
            const department = await this.departmentService.createDepartment(createDepartmentDto);
            res.locals = {
                data: department,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    updateDepartment = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const departmentId = parseInt(req.params.id);
            const createDepartmentDto = plainToInstance(CreateDepartmentDto,req.body);
            const errors = await validate(createDepartmentDto);
            if(errors.length > 0){
                throw new ValidationException(errors);
            }
            const department = await this.departmentService.updateDepartment(createDepartmentDto,departmentId);
            res.locals = {
                data: department,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }

    deleteDepartment = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const departmentId = parseInt(req.params.id);
            const department = await this.departmentService.deleteDepartmentById(departmentId);
            res.locals = {
                data: department,
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

export default DepartmentController;
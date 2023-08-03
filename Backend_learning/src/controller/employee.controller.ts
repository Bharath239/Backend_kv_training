import EmployeeService from "../service/employee.service";
import express from "express";

export default class EmployeeController{
    public router: express.Router;
    
    constructor(private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get("/", this.getAllEmployees);
        this.router.get("/:id", this.getEmployeeById);
        this.router.delete("/:id",this.deleteEmployeeById);
    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    getEmployeeById = async (req: express.Request, res: express.Response) => {
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
    }

    deleteEmployeeById = async(req: express.Request, res: express.Response) => {
        const employeeId = Number(req.params.id);
        const employee = await this.employeeService.deleteEmployeeById(employeeId);
        res.status(200).send(employee);
    }
}
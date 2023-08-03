import Employee from "../entity/employee.entity";
import { Repository } from "typeorm";


export default class EmployeeRepository{
    constructor(private employeeRepository: Repository<Employee>){
    }

    findAllEmployees(): Promise<Employee[]>
    {
        return this.employeeRepository.find();
    }

    findEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneBy({
            id: id
        })
    }

    async deleteEmployeeById(id: number): Promise<Employee> {
        return await this.employeeRepository.softRemove({
            id: id
        });
    }

    // async createEmployeeById(id: number): Promise<Employee> {
    //     const newemployee = 
    //     return await this.employeeRepository.save({

    //     })
    // }
}
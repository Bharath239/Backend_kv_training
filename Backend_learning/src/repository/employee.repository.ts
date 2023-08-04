import Employee from "../entity/employee.entity";
import { Repository } from "typeorm";


export default class EmployeeRepository{
    constructor(private employeeRepository: Repository<Employee>){
    }

    findAllEmployees(): Promise<Employee[]>
    {
        return this.employeeRepository.find({
            relations:{
                address: true
            }
        });
    }

    findEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOne({
            where:{id: id},
            relations:{
                address:true
            }
        })
    }

    findEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findOne({
            where:{email: email},
            relations:{
                address:true
            }
        })
    }

    async deleteEmployeeById(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.softRemove(employee);
    }

    async createEmployee(newemployee: Employee): Promise<Employee> {
        return await this.employeeRepository.save(newemployee);
    }
    
    async putEmployee(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.save(employee);
    }
}
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";


export default class EmployeeService{
    

    constructor(private employeeRepository :EmployeeRepository){
    }

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAllEmployees();
    }

    getEmployeeById(id: number): Promise<Employee | null> {
        return this.employeeRepository.findEmployeeById(id);
    }

    async deleteEmployeeById(id: number): Promise<Employee | void>{
        const employee = await this.getEmployeeById(id)
        if(await this.getEmployeeById(id)){
            return this.employeeRepository.deleteEmployeeById(id);
        }
        else{
            console.log("Element not found");
        }    
    }


}
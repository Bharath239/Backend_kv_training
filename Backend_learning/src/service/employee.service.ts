import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import httpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    

    constructor(private employeeRepository :EmployeeRepository){
    }

    async getAllEmployees(): Promise<Employee[]> {
        const employees: Employee[] = await this.employeeRepository.findAllEmployees();
        if(employees.length == 0){
            throw new httpException(404,"Elements not found");
        }
        return employees;
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        const employee = await this.employeeRepository.findEmployeeById(id);
        if(!employee){
            throw new httpException(404,"Element not found");
        }
        return employee;
    }

    async deleteEmployeeById(id: number): Promise<Employee | void>{
        const employee = await this.getEmployeeById(id)
        if(employee){
            return this.employeeRepository.deleteEmployeeById(employee);
        }
    }

    createEmployee(name: string, email: string, address: Address): Promise<Employee> {
        const newemployee = new Employee();
        newemployee.name = name;
        newemployee.email = email;

        const neweaddress = new Address();
        neweaddress.line1 = address.line1;
        neweaddress.pincode = address.pincode;

        newemployee.address = neweaddress;

        return this.employeeRepository.createEmployee(newemployee);
    }

    async putEmployee(name: string, email: string,address: Address,id: number): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        employee.name = name;
        employee.email = email;
        employee.address.line1 = address.line1;
        employee.address.pincode = address.pincode;
        return this.employeeRepository.putEmployee(employee);
    }

}

export default EmployeeService;
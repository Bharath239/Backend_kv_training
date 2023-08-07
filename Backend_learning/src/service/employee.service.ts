import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import httpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import CreateEmployeeDto from "../dto/create.employee.dto";
import LoginCredentialsDto from "../dto/login.credential.dto";

class EmployeeService{
    constructor(private employeeRepository :EmployeeRepository){
    }

    async getAllEmployees(): Promise<Employee[] | null> {
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

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        const usernameCheck = await this.employeeRepository.findEmployeeByUsername(createEmployeeDto.username);
        if(usernameCheck){
            throw new httpException(409,"Username is taken");
        }
        const newemployee = new Employee();
        newemployee.name = createEmployeeDto.name;
        newemployee.username = createEmployeeDto.username;
        // newemployee.email = createEmployeeDto.email;
        newemployee.password = await bcrypt.hash(createEmployeeDto.password,10);
        newemployee.joiningDate = createEmployeeDto.joiningDate;
        newemployee.experience = createEmployeeDto.experience;
        newemployee.departmentId = createEmployeeDto.departmentId;
        newemployee.role = createEmployeeDto.role;
        const newaddress = new Address();
        
        newaddress.address_line_1 = createEmployeeDto.address.address_line_1;
        newaddress.address_line_2 = createEmployeeDto.address.address_line_2;
        newaddress.city = createEmployeeDto.address.city;
        newaddress.state = createEmployeeDto.address.state;
        newaddress.country = createEmployeeDto.address.country;
        newaddress.pincode = createEmployeeDto.address.pincode;

        newemployee.address = newaddress;

        return this.employeeRepository.createEmployee(newemployee);
    }

    async putEmployee(createEmployeeDto: CreateEmployeeDto,id: number): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        employee.name = createEmployeeDto.name;
        const usernameCheck = await this.employeeRepository.findEmployeeByUsername(createEmployeeDto.username);
        if(usernameCheck){
            throw new httpException(409,"Username is taken");
        }
        employee.username = createEmployeeDto.username;
        // employee.email = createEmployeeDto.email;
        employee.password = await bcrypt.hash(createEmployeeDto.password,10);
        employee.joiningDate = createEmployeeDto.joiningDate;
        employee.experience = createEmployeeDto.experience;
        employee.departmentId = createEmployeeDto.departmentId;
        employee.role = createEmployeeDto.role;

        employee.address.address_line_1 = createEmployeeDto.address.address_line_1;
        employee.address.address_line_2 = createEmployeeDto.address.address_line_2;
        employee.address.city = createEmployeeDto.address.city;
        employee.address.state = createEmployeeDto.address.state;
        employee.address.country = createEmployeeDto.address.country;
        employee.address.pincode = createEmployeeDto.address.pincode;
        return this.employeeRepository.putEmployee(employee);
    }

    async deleteEmployeeById(id: number): Promise<Employee | void>{
        const employee = await this.getEmployeeById(id);
        if(employee){
            return await this.employeeRepository.deleteEmployeeById(employee);
        }
    }       

    loginEmployee = async (loginCredentialsDto: LoginCredentialsDto) => {
        const employee = await this.employeeRepository.findEmployeeByUsername(loginCredentialsDto.username);
        if(!employee){
            throw new HttpException(404,"Element not found");
        }
        employee.isActive = true;
        const result = await bcrypt.compare(loginCredentialsDto.password, employee.password);
        if(!result){
            throw new HttpException(401,"Incorrect username or password");
        }


        const payload = {
            name: employee.name,
            username: employee.username,
            role: employee.role
        }

        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {  
            expiresIn:process.env.TOKEN_EXPIRY_TIME
         });

         return {token: token, employeeDetails: employee};
    }
}

export default EmployeeService;
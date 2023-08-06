import CreateDepartmentDto from "../dto/department.dto";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository){
    }

    async getAllDepartments(): Promise<Department[] | null> {
        const departments: Department[] = await this.departmentRepository.findAllDepartments();
        if(departments.length == 0){
            throw new HttpException(404,"Elements not found");
        }
        return departments;
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        const department: Department = await this.departmentRepository.findDepartmentById(id);
        if(!department){
            throw new HttpException(404,"Elements not found");
        }
        return department;
    }

    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const departmentnameCheck = await this.departmentRepository.findDepartmentByName(createDepartmentDto.name);
        if(departmentnameCheck){
            throw new HttpException(403,"Department already exist");
        }
        const newDepartment = new Department();
        newDepartment.name = createDepartmentDto.name;
        return await this.departmentRepository.createDepartment(newDepartment);
    }

    async updateDepartment(createDepartmentDto: CreateDepartmentDto,id: number): Promise<Department> {
        const department = await this.getDepartmentById(id);
        const departmentnameCheck = await this.departmentRepository.findDepartmentByName(createDepartmentDto.name);
        if(departmentnameCheck){
            throw new HttpException(403,"Department already exist");
        }   
        department.name = createDepartmentDto.name;
        return await this.departmentRepository.updateDepartment(department);
    }

    async deleteDepartmentById(id: number): Promise<Department> {
        const department = await this.getDepartmentById(id);
        if(department){
            return await this.departmentRepository.deleteDepartmentById(department);
        }
    }

}

export default DepartmentService;
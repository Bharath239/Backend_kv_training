import {Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository{
    constructor(private departmentRepository: Repository<Department>){
    }

    findAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    findDepartmentById(id: number): Promise<Department> {
        return this.departmentRepository.findOne({
            where: {id : id}
        });
    }

    findDepartmentByName(name: string): Promise<Department> {
        return this.departmentRepository.findOne({
            where: {name : name}
        });
    }

    async createDepartment(newDepartment: Department): Promise<Department> {
        return await this.departmentRepository.save(newDepartment);
    }

    async updateDepartment(department: Department): Promise<Department> {
        return await this.departmentRepository.save(department);
    }

    async deleteDepartmentById(department: Department): Promise<Department> {
        return await this.departmentRepository.softRemove(department);
    }

}

export default DepartmentRepository;
import { Column,Entity, ManyToOne, OneToOne,} from "typeorm";
import "reflect-metadata";
import Address from "./address.entity";
import AbstractEntity from "./abstract.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";
// import Roles from "./role.entity";

@Entity("employees")
class Employee extends AbstractEntity{
    @Column()
    name: string;

    @Column()
    username: string;
        
    // @Column()
    // email: string;

    @Column()
    password: string;

    @Column()
    joiningDate: string;

    @Column()
    experience: number;

    @Column()
    departmentId: number;

    @Column({default: true})
    isActive: Boolean;

    @Column()
    role: Role;

    // @ManyToOne(() => Roles, (role) => role.employees)
    // role: Role;

    @OneToOne(() => Address, (address) => address.employee, {cascade:true})
    address: Address;

    @ManyToOne(() => Department, (department) => department.employees)
    department: Department;

}

export default Employee;
import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity("roles")
class Roles extends AbstractEntity{
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.role)
    employees: Employee[];
}

export default Roles;  
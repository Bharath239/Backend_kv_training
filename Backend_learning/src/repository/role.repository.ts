import { Repository } from "typeorm";
import Roles from "../entity/role.entity";
import { Role } from "../utils/role.enum";


class RoleRepository{
    constructor(private roleRepository: Repository<Roles>){
    }

    findAllRoles(): Promise<Roles[]> {
        return this.roleRepository.find();
    }

    
}

export default RoleRepository;  
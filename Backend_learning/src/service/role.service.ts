// import Roles from "../entity/role.entity";
// import HttpException from "../exception/http.exception";
// import RoleRepository from "../repository/role.repository";


// class RoleService {
//     constructor(private roleRepository: RoleRepository){
//     }

//     async getAllRoles(): Promise<Roles[] | null> {
//         const roles: Roles[] = await this.roleRepository.findAllRoles();
//         if(roles.length == 0){
//             throw new HttpException(404,"Elements not found");
//         }
//         return roles;
//     }

// }

// export default RoleService;
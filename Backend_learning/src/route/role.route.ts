import RoleController from "../controller/role.controller";
import dataSource from "../db/postgres.db";
import Roles from "../entity/role.entity";
import RoleRepository from "../repository/role.repository";
import RoleService from "../service/role.service";

const datasource = dataSource.getRepository(Roles);
const roleRepository = new RoleRepository(datasource);
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const roleRoute = roleController.router;

export default roleRoute;
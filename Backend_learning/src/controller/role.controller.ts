// import express, { NextFunction } from "express";
// import authenticate from "../middleware/authenticate.middleware";
// import RoleService from "../service/role.service";

// class RoleController{
//     public router: express.Router;

//     constructor(private roleService: RoleService){
//         this.router = express.Router();
//         this.router.get("/",authenticate,this.getAllRoles);
//     }

//     getAllRoles = async(req: express.Request, res: express.Response, next: NextFunction) => {
//         try{
//             const roles = await this.roleService.getAllRoles();
//             res.status(200).send({data: roles, error: null, message: "OK"});
//         }catch(error){
//             next(error);
//         }
//     }
// }

// export default RoleController;
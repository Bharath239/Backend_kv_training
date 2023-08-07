import express, { NextFunction } from "express";
import authenticate from "../middleware/authenticate.middleware";
import { Role } from "../utils/role.enum";

class RoleController{
    public router: express.Router;

    constructor(){
        this.router = express.Router();
        this.router.get("/",authenticate,this.getAllRoles);
    }

    getAllRoles = async(req: express.Request, res: express.Response, next: NextFunction) => {
        try{
            const roles = Object.values(Role);
            res.locals = {
                data: roles,
                errors: null,
                message: "OK",
            }
            res.status(201);
            next();
        }catch(error){
            next(error);
        }
    }
}

export default RoleController;
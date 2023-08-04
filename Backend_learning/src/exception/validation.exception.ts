import { ValidationError } from "class-validator";
import httpException from "./http.exception";

class ValidationException extends httpException{

    public errObject = {}
    constructor(status: number,message: string,validationErrors: ValidationError[]){
        super(status, message);
        validationErrors.map((error) => {
            if (error.children.length > 0){
                const errchildObject = {};
                error.children.map((child) => {
                    errchildObject[child.property] = Object.values(child.constraints);
                })
                this.errObject[error.property] = errchildObject;
            }else{
                this.errObject[error.property] = Object.values(error.constraints);
                console.log(this.errObject);
            }
            }
        )
    }
}

export default ValidationException;
import { ValidationError } from "class-validator";
import httpException from "./http.exception";

class ValidationException extends httpException{

    public errObject = {}
    constructor(validationErrors: ValidationError[]){
        super(400, "Validation Errors");
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

// use recursion to find children constraints

export default ValidationException;
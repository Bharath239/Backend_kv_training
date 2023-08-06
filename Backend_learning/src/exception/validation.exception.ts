import { ValidationError } from "class-validator";
import httpException from "./http.exception";

class ValidationException extends httpException{
    public errObject = {}
    
    constructor(validationErrors: ValidationError[]){
        super(400, "Validation Errors");
        
        validationErrors.map(error => {
            return this.displayError(error,this.errObject);
        })
    }
    
    displayError = (error: ValidationError, errObject: object) => {
        if(error.children.length > 0){
            const errChildObject = {};
            error.children.map(child => {
                this.displayError(child, errChildObject);
            });
            errObject[error.property] = errChildObject;
        }
        else{
            errObject[error.property] = Object.values(error.constraints);
        }
    }
}

// use recursion to find children constraints

export default ValidationException;
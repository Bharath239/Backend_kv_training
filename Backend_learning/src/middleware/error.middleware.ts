import express from "express";
import httpException from "../exception/http.exception";
import validationException from "../exception/validation.exception";

const errorMiddleware = (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try{
        console.log(error);
        if(error instanceof validationException) {
            res.status(400).send({
                message: error.message,
                errors: error.errObject
            });
        }else if(error instanceof httpException){
            res.status(error.status).send({error: error.message});
            return;
        }
        else{
            res.status(500).send({error: error.message});
        }
    }
    catch(err){
        next(err);
    }
  }

  export default errorMiddleware;
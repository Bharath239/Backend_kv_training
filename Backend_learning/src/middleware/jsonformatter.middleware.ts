import express, { NextFunction } from "express";
import logger from "../logger/logger";

const jsonformatter = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try{
        logger.info("Request Successful")
        const formattedResponse = {
            data: res.locals.data,
            errors: res.locals.errors,
            message: res.locals.message
        }
        res.send(formattedResponse)
    }catch(error){
        next(error);
    }
}

export default jsonformatter;
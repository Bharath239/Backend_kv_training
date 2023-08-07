// import express, { NextFunction } from "express";

// const jsonformatter = async (req: express.Request, res: express.Response, next: NextFunction) => {
//     try{
//         const formattedResponse = {
//             data: res.locals.body,
//             errors: res.locals.error,
//             message: res.locals.message
//         }
//         res.send(formattedResponse)
//     }catch(error){
//         next(error);
//     }
// }

// export default jsonformatter;
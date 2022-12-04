import { ErrorRequestHandler,NextFunction, Request, Response } from "express";
export const errorHandler = (error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>{
    if (error instanceof Error) {
        console.log(error.message);
        return res.send({ success: false, error: error.message });
      }
      console.log(error);

      return res.send({ success: false, error: "Server error" });
}
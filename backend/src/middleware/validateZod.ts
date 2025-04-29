
import { Request, Response, NextFunction } from "express";
import { ZodSchema , z } from "zod";
import AppError from "../errors/AppError";

const validate = (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if request content type is JSON or form data
        
        if (req.is('json')) {
            
            await schema.parseAsync(req.body);
        } else if (req.is('multipart/form-data') == "multipart/form-data") {
            const formData: any = {};
            // Extract all fields from req.body (excluding files handled by multer)
            for (const key in req.body) {
                if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                    if (key !== 'file') {
                        formData[key] = req.body[key];
                    }
                }
            }
            // Validate the extracted form data against the schema
            await schema.parseAsync(formData);
        } else {
            return next(new AppError("Unsupported content type", 400))
            //throw new AppError('Unsupported content type', 400);
        }

        next();
    } catch (error:any) {
        if (error.errors) {
            const errorMessages = error.errors.map((e: any) => e.message).join(', ');
            return next(new AppError(errorMessages, 400));
        } else {
            return next(new AppError(error.message, 400));
        }
    }
};


export default validate;
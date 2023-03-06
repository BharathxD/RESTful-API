import { Request, Response, NextFunction } from "express";
import { AnyZodObject, Schema } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Checking the schema
      schema.parse({
        body: JSON.parse(req.body),
        query: req.query,
        params: req.params,
      })
      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };

export default validate;

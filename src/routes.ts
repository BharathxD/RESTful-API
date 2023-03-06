import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import createSessionSchema from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResource";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post(
    "/api/users",
    validate(createUserSchema),
    createUserHandler
  );
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get(
    "/api/products/:productId",
    validate(getProductSchema),
    getProductHandler
  );

  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;

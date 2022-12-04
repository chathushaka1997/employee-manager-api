import { Express, Request, Response } from "express";
import { initEmployeeRoutes } from "./employee";

export function initRoutes(app: Express) {
  app.get("/api", (req: Request, res: Response) => res.send("Employee-manager™ Api"));

  initEmployeeRoutes(app);

  /* ALL INVALID REQUESTS */
  app.get("/", (req: Request, res: Response) => res.redirect(301, "/api"));
  app.all("*", (req: Request, res: Response) => res.send("Invalid Route"));
}

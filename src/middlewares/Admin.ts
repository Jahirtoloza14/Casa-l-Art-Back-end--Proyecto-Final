import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../constants/Roles";


const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.tokenData.role !== "admin") {
    return res.json({
      success: true,
      message: "You don't have permission to perform this action"
    })
  }
  next()
};

export const authorizeMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.tokenData.role;
    if (userRole === UserRoles.ADMIN.name) {
      return next();
    }
    if (userRole === UserRoles.CLIENT.name) {
      return next();
    }
    else {
      res.status(401).json({ message: "no has been authorized" })
    }
  }
}

export const authorizeMiddlewareAdmin = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.tokenData.role;
    if (userRole === UserRoles.ADMIN.name) {
      return next();
    }
    else {
      res.status(401).json({ message: "NO PASS , Unauthorized" })
    }
  }
}
export { isSuperAdmin }
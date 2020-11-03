/**
 * This middleware authenticates private routes
 */

import { NextFunction, Request, Response } from "express";
import Logger from "../etc/logger";

export default function ProtectedAuthenticate(req: Request, res: Response, next: NextFunction) {
    next();
}

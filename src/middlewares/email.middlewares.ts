/**
 * This file contains middlewares for product routes
 */

import { NextFunction, Request, Response } from "express";
import MongoDbHelpers from "../etc/db/helpers";
import { validateRequest } from "../lib/validator/validator";

/**
 * @class EmailMiddleware
 */

export default class EmailMiddleware {

    /**
     * @public
     * @static
     */
    public static getTemplates: any = [];

    /**
     * @middleware
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    private static applyFilters(req: Request, res: Response, next: NextFunction) {
        res.locals.filters = MongoDbHelpers.filters({});
        next();
    }
}

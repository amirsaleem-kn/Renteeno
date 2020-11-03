/**
 * Top level file for public routes
 * Public routes are available on /api/public and are accessible by general public
 */

import express, { NextFunction, Request, Response } from "express";
import expressValidator from "../../lib/validator/validator";
import ErrorMiddleware from "../../middlewares/error.middleware";

const router = express.Router();

router.use(expressValidator);

router.route("/").get((req: Request, res: Response, next: NextFunction) => {
    res.json({
        status: "success"
    });
});

router.use(ErrorMiddleware);

export default router;

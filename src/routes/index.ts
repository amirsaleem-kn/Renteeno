/**
 * Top level file for Routes
 */

/** Packages */
import express from "express";
import ErrorHandler from "../middlewares/error.middleware";
/** Middlewares */
import PreflightHandler from "../middlewares/options.middleware";
import RequestLogger from "../middlewares/request-logger.middleware";
/** Express.Router  */
import privateRouter from "./private";
import protectedRouter from "./protected";
import publicRouter from "./public";

/** create a new router */
const router = express.Router();
/** log every incoming request */
router.use(RequestLogger);
/** Handle CORS Policy Headers */
router.use(PreflightHandler);
/** /api/public routes are unauthenticated routes */
router.use("/public", publicRouter);
/** /api/protected routes are protected by username and a password and a client key */
router.use("/protected", protectedRouter);
/** /api/protected routes are private routes and can only be accessed by access token */
router.use("/private", privateRouter);
/** if user has called next(err) in any of the routes, this middleware will be called */
router.use(ErrorHandler);

export default router;

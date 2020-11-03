/**
 * Top level file for protected routes
 * Protected routes are available on /api/protected and are accessible using username, password and client key
 */

import express from "express";
import expressValidator from "../../lib/validator/validator";
import ErrorMiddleware from "../../middlewares/error.middleware";
import ProtectedAuthenticate from "../../middlewares/protected-authenticate.middleware";

const router = express.Router();

router.use(expressValidator);

router.use(ProtectedAuthenticate);

router.use(ErrorMiddleware);

export default router;

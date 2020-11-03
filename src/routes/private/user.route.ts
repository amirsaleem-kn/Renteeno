import { Router } from "express";
import controller from "../../controllers/user.controller";
import { validateRequest } from "../../lib/validator/validator";
import model from "../../models/user.model";

const router = Router();

router.route("/")
    .post(validateRequest(model.createUser), controller.createUser);

router.route("/:userId")
    .put(validateRequest(model.editUser), controller.editUser)
    .delete(validateRequest(model.removeUser), controller.removeUser)

router.route("/login")
    .post(validateRequest(model.login), controller.login);

export default router;

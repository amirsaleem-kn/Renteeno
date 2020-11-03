import { Router } from "express";
import controller from "../../controllers/item.controller";
import { validateRequest } from "../../lib/validator/validator";
import model from "../../models/item.model";

const router = Router();

router.route("/")
    .post(validateRequest(model.createItem), controller.createItem);

router.route("/:userId")
    .put(validateRequest(model.editItem), controller.editItem)
    .delete(validateRequest(model.removeItem), controller.removeItem)

export default router;

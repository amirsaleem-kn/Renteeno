import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import Item from "../dao/item";
import ResponseHandler from "../etc/response";

/**
 * @class ItemController
 */
export default class ItemController {

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async createItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, rentPrice, actualCost, manufactureDate, ownerId, rentOwnerId, onRent } = req.body;

            const item = {
                actualCost,
                manufactureDate,
                name,
                onRent,
                ownerId,
                rentOwnerId,
                rentPrice,
            };

            const user = await Item.insertOne(item);
            ResponseHandler.success(res, { user });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async editItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { itemId } = req.params;
            const { name, rentPrice, actualCost, manufactureDate, ownerId, rentOwnerId, onRent } = req.body;
            const params = { name, rentPrice, actualCost, manufactureDate, ownerId, rentOwnerId, onRent };

            const item = await Item.getItem({ _id: new ObjectId(itemId) });

            if (item.onRent) {
                ResponseHandler.unprocessableEntity(res, [{ msg: `Cannot edit, item is on rent` }]);
                return;
            }

            await Item.editItem(params, new ObjectId(itemId));
            ResponseHandler.success(res, { itemId });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async removeItem(req: Request, res: Response, next: NextFunction) {
        try {
            const { itemId } = req.params;
            await Item.removeItem(new ObjectId(itemId));

            const item = await Item.getItem({ _id: new ObjectId(itemId) });

            if (item.onRent) {
                ResponseHandler.unprocessableEntity(res, [{ msg: `Cannot delete, item is on rent` }]);
                return;
            }

            ResponseHandler.success(res, { itemId });
        } catch (e) {
            next(e);
        }
    }
}

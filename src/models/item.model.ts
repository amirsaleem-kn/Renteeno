import { IModel, types } from "./types";

/**
 * @class ItemModel
 */
export default class ItemModel {

    public static createItem: IModel = {
        actualCost: { required: true, type: types.number },
        manufactureDate: { required: true, type: types.string },
        name: { required: true, type: types.string },
        onRent: { required: true, type: types.boolean },
        ownerId: {  type: types.string },
        rentOwnerId: { required: true, type: types.string },
        rentPrice: { required: true, type: types.number },
    };

    public static removeItem: IModel = {
        itemId: { required: true, type: types.string }
    };

    public static editItem: IModel = {
        actualCost: { required: true, type: types.number },
        itemId: { required: true, type: types.string },
        manufactureDate: { required: true, type: types.string },
        name: { required: true, type: types.string },
        onRent: { required: true, type: types.boolean },
        ownerId: {  type: types.string },
        rentOwnerId: { required: true, type: types.string },
        rentPrice: { required: true, type: types.number },
    };

}

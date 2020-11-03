/**
 * @description This file contains DAO logic for User Collection
 */

import { ObjectId } from "bson";
import { Collection, Db } from "mongodb";

/**
 * ------------------------------
 * ------ TYPE DEFINITIONS ------
 * ------------------------------
 */

interface ItemSchema {
    name: string;
    rentPrice: string;
    actualCost: number;
    manufactureDate: string;
    ownerId: ObjectId;
    onRent: boolean;
    rentOwnerId?: ObjectId;
}

interface IItemSchema extends ItemSchema {
    _id: ObjectId;
    timestamp: number;
}

let collection: Collection;
const collectionName = "items";

/**
 * @class Items
 */
export default class Items {

    /**
     * @public
     * @static
     * @async
     * @param { Db } db
     */
    public static async injectDB(db: Db): Promise<Collection> {
        collection = db.collection(collectionName);
        return collection;
    }

    /**
     * @public
     * @static
     * @param { Promise<ItemSchema> } user
     * @returns { Promise<any> }
     */
    public static async insertOne(item: ItemSchema): Promise<unknown> {
        const result = await collection.insertOne(item);
        return result.insertedId;
    }

    /**
     * @public
     * @static
     * @param {  Partial<ItemSchema> } filters
     * @returns { Promise<ItemSchema> }
     */
    public static async getItem(filters: Partial<IItemSchema>): Promise<ItemSchema> {
        const result = await collection.findOne(filters ? filters : null);
        return result;
    }

    /**
     * @public
     * @static
     * @async
     * @param { ObjectId } userId uniqueId of the item
     * @returns { Promise<ObjectId> }
     */
    public static async removeItem(itemId: ObjectId): Promise<ObjectId> {
        await collection.deleteOne({ _id: itemId });
        return itemId;
    }

    /**
     * @public
     * @static
     * @async
     * @param { ObjectId } itemId uniqueId of the item
     * @returns { Promise<ObjectId> }
     */
    public static async editItem(params: Partial<ItemSchema>, itemId: ObjectId): Promise<ObjectId> {
        await collection.updateOne({ _id: itemId }, { $set: params });
        return itemId;
    }

}

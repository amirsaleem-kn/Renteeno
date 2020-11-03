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

interface UserSchema {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: number;
    username: string;
    password: string;
    salt: string;
}

interface IUserSchema extends UserSchema {
    _id: ObjectId;
    timestamp: number;
}

let collection: Collection;
const collectionName = "user";

/**
 * @class User
 */
export default class User {

    /**
     * @public
     * @static
     * @async
     * @param { Db } db
     */
    public static async injectDB(db: Db): Promise<Collection> {
        collection = db.collection(collectionName);
        // await db.command(User.Validator);
        await collection.createIndex({ email: 1, username: 1 }, { unique: true });
        return collection;
    }

    /**
     * @public
     * @static
     * @param { Promise<UserSchema> } user
     * @returns { Promise<any> }
     */
    public static async insertOne(user: UserSchema): Promise<unknown> {
        const result = await collection.insertOne(user);
        return result.insertedId;
    }

    /**
     * @public
     * @static
     * @param {  Partial<IUserSchema> } filters
     * @returns { Promise<IUserSchema> }
     */
    public static async getUser(filters: Partial<IUserSchema>): Promise<IUserSchema> {
        const result = await collection.findOne(filters ? filters : null);
        return result;
    }

    /**
     * @public
     * @static
     * @async
     * @param { ObjectId } userId uniqueId of the user
     * @returns { Promise<ObjectId> }
     */
    public static async removeUser(userId: ObjectId): Promise<ObjectId> {
        await collection.deleteOne({ _id: userId });
        return userId;
    }

    /**
     * @public
     * @static
     * @async
     * @param { ObjectId } userId uniqueId of the user
     * @returns { Promise<ObjectId> }
     */
    public static async editUser(params: Partial<UserSchema>, userId: ObjectId): Promise<ObjectId> {
        await collection.updateOne({ _id: userId }, { $set: params });
        return userId;
    }

    /**
     * @private
     * @static
     */
    private static Validator = {
        collMod: collectionName,
        validationAction: "error",
        validationLevel: "strict",
        validator: {
            $jsonSchema: {
                bsonType: "object",
                properties: {
                    createdAt: {
                        description: "createdAt is required"
                    },
                    email: {
                        description: "email is required",
                    },
                    firstName: {
                        bsonType: "string",
                        description: "firstName is requried",
                    },
                    lastName: {
                        bsonType: "string",
                        description: "lastName is required"
                    },
                    password: {
                        description: "password is required"
                    },
                    salt: {
                        description: "salt is required"
                    },
                    username: {
                        description: "username is required"
                    },
                },
                required: ["firstName", "lastName", "email", "createdAt", "username", "password"],
            },
        },
    };

}

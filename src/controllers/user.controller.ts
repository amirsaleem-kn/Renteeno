import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../dao/user.dao";
import ResponseHandler from "../etc/response";
import { md5, randomBytes } from "../lib/crypto";

/**
 * @class UserController
 */
export default class UserController {

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, username, password, phone } = req.body;
            const createdAt = Date.now();
            const salt = randomBytes();
            const encPassword = md5(password, salt);

            const userDetails = {
                createdAt,
                email,
                firstName,
                lastName,
                password: encPassword,
                phone,
                salt,
                username,
            };

            const user = await User.insertOne(userDetails);
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
    public static async editUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { firstName, lastName, email, username, password, phone } = req.body;
            const user = { firstName, lastName, email, username, password, phone };
            await User.editUser(user, new ObjectId(userId));
            ResponseHandler.success(res, { userId });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async removeUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            await User.removeUser(new ObjectId(userId));
            ResponseHandler.success(res, { userId });
        } catch (e) {
            next(e);
        }
    }

    /**
     * @param { Express.Request } req Request
     * @param { Express.Response } res Response
     * @param { Express.NextFunction } next NextFunction
     */
    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body; // This Should've been Bearer Auth Header, due to less time doing this.
            const user = await User.getUser({ username });
            if (!user) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "Invalid Username" }]);
                return;
            }
            const { salt, password: dbEncPassword } = user;
            const encPassword = md5(password, salt);

            if (dbEncPassword !== encPassword) {
                ResponseHandler.unprocessableEntity(res, [{ msg: "Invalid Password" }]);
                return;
            }

            ResponseHandler.success(res, user);
        } catch (e) {
            next(e);
        }
    }

}

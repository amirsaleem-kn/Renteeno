/**
 * This middleware authenticates private routes
 */

import { NextFunction, Request, Response } from "express";
import UnauthorizedRequestException from "../etc/exception/UnauthorisedException";

/**
 * @param { Express.Request } req Request
 * @param { Express.Response } res Response
 * @param { Express.NextFunction } next NextFunction
 */

export default function PrivateAuthenticate(req: Request, res: Response, next: NextFunction) {
    try {

        if (req.method === "OPTIONS") {
            return next();
        }

        const auth = req.get("Authorization");
        /** extract the username, and password from the base64 decoded string  */
        const [username, password] = (Buffer.from(auth.split(" ").pop(), "base64").toString("utf8")).split(":");
        /** compare the username and password with that of a server  */
        if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
            throw new UnauthorizedRequestException(`User is unauthorised to request this route`);
        }
        /** user is authorised */
        next();
    } catch (e) {
        /** user is unauthorised  */
        next(new UnauthorizedRequestException(`User is unauthorised to request this route`));
    }
}

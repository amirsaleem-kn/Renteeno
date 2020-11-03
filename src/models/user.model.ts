import { IModel, types } from "./types";

/**
 * @class UserModel
 */
export default class UserModel {

    public static createUser: IModel = {
        email: { required: true, type: types.string },
        firstName: { required: true, type: types.string, maxLength: 50 },
        lastName: { required: true, type: types.string, maxLength: 50 },
        password: { required: true, type: types.string, maxLength: 20 },
        phone: { maxLength: 12, type: types.string },
        username: { required: true, type: types.string, maxLength: 30 },
    };

    public static removeUser: IModel = {
        userId: { required: true, type: types.string }
    };

    public static login: IModel = {
        password: { required: true, type: types.string },
        username: { required: true, type: types.string },
    };

    public static editUser: IModel = {
        email: { type: types.string },
        firstName: { type: types.string, maxLength: 50 },
        lastName: { type: types.string, maxLength: 50 },
        password: { type: types.string, maxLength: 10 },
        phone: { maxLength: 10, type: types.string },
        userId: { required: true, type: types.string },
        username: { type: types.string, maxLength: 10 },
    };

}

/**
 * MongoDb Entry File
 */

import mongodb from "mongodb";
/** DAO  */
import User from "../../dao/user.dao";
/** Logger */
import Logger from "../logger";

/** create a new mongoDb client  */
const client = mongodb.MongoClient.connect;
/** create a connect function for MongoDb client  */
async function connect() {
    const connection = (await client(process.env.BLINDS_DB_URI, { useUnifiedTopology: true })).db(process.env.BLINDS_NS);
    Logger.info("MongoDB Connection Successfull");
    await User.injectDB(connection); // User collection
    return connection;
}

export default connect;

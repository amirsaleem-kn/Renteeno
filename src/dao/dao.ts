import { Collection, Db } from "mongodb";

export default abstract class DAO {
    public async abstract injectDB(db: Db): Promise<Collection>;
}

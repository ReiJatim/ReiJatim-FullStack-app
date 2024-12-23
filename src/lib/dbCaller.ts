import { clientMongo } from "@/db/config"
import { Db } from "mongodb";

const DATABASE_NAME = process.env.MONGO_DB_NAME;

export const getDb = async () => {
    const client = await clientMongo();
    const db: Db = client.db(DATABASE_NAME);

    return db;
}

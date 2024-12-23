import { MongoClient } from "mongodb";

const connection = process.env.MONGO_CONNECT;

if (!connection) {
    console.log(process.env.MONGO_CONNECT);
  throw new Error("connection env is not defined");
}

let client: MongoClient;

export const clientMongo = async () => {
  if (!client) {
    client = await MongoClient.connect(connection);
    await client.connect();
  }

  return client
};

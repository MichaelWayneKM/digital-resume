import { ConnectOptions, connect } from "mongoose";

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
};

export async function connectDb() {
  try {
    await connect(dbConnection.url, dbConnection.options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }
}
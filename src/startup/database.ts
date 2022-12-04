import mongoose from "mongoose";

export default async function databaseSetup() {
  const MONGO_URI = "mongodb://127.0.0.1:27017/employee-manager";
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("successfully connected to database");
    })
    .catch((err) => {
      console.log("database connection failed. exiting now...");
      console.error(err);
      process.exit(1);
    });
}

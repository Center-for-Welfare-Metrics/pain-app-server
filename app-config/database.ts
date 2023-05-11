import mongoose from "mongoose";
import winston from "winston";

const databaseConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);

    winston.info("Connected to database");
  } catch (error) {
    winston.error("Error connecting to database");
  }
};

export default databaseConfig;

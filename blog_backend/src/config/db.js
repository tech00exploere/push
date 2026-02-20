import mongoose from "mongoose";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isValidMongoUri = (uri) =>
  typeof uri === "string" &&
  (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"));

const logAtlasHint = (error) => {
  const reason = error?.reason;
  const topologyType = reason?.type;

  if (topologyType === "ReplicaSetNoPrimary") {
    console.error(
      "Atlas reachable but no primary selected. Check Atlas Network Access/IP allowlist, DB user credentials, and local firewall."
    );
  }

  if (error?.name === "MongooseServerSelectionError") {
    console.error(
      "If using Atlas, ensure your current IP is allowed in Atlas Network Access."
    );
  }
};

const connectDB = async (attempt = 1) => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing in .env");
  }

  if (!isValidMongoUri(uri)) {
    throw new Error("MONGO_URI must start with mongodb:// or mongodb+srv://");
  }

  const maxRetries = Number(process.env.DB_CONNECT_RETRIES || 3);
  const retryDelayMs = Number(process.env.DB_CONNECT_RETRY_DELAY_MS || 3000);

  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(
      `MongoDB connection error (attempt ${attempt}/${maxRetries}):`,
      error.message
    );
    logAtlasHint(error);

    if (attempt < maxRetries) {
      console.log(`Retrying MongoDB connection in ${retryDelayMs}ms...`);
      await sleep(retryDelayMs);
      return connectDB(attempt + 1);
    }

    throw error;
  }
};

export default connectDB;

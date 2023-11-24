import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", false);
  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB_URI is not defined");
  }
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;

    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
